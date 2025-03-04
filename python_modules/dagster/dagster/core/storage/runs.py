from abc import abstractmethod
from collections import OrderedDict, defaultdict
from datetime import datetime

import sqlalchemy as db

from dagster import check
from dagster.core.events import DagsterEvent, DagsterEventType
from dagster.core.serdes import deserialize_json_to_dagster_namedtuple, serialize_dagster_namedtuple

from .pipeline_run import PipelineRun, PipelineRunStatus
from .run_storage_abc import RunStorage


class InMemoryRunStorage(RunStorage):
    def __init__(self):
        self._runs = OrderedDict()

    def add_run(self, pipeline_run):
        check.inst_param(pipeline_run, 'pipeline_run', PipelineRun)
        check.invariant(
            not self._runs.get(pipeline_run.run_id),
            'Can not add same run twice for run_id {run_id}'.format(run_id=pipeline_run.run_id),
        )

        self._runs[pipeline_run.run_id] = pipeline_run
        return pipeline_run

    def handle_run_event(self, run_id, event):
        check.str_param(run_id, 'run_id')
        check.inst_param(event, 'event', DagsterEvent)
        run = self._runs[run_id]

        if event.event_type == DagsterEventType.PIPELINE_START:
            self._runs[run_id] = run.run_with_status(PipelineRunStatus.STARTED)
        elif event.event_type == DagsterEventType.PIPELINE_SUCCESS:
            self._runs[run_id] = run.run_with_status(PipelineRunStatus.SUCCESS)
        elif event.event_type == DagsterEventType.PIPELINE_FAILURE:
            self._runs[run_id] = self._runs[run_id].run_with_status(PipelineRunStatus.FAILURE)

    def all_runs(self, cursor=None, limit=None):
        return self._slice(list(self._runs.values())[::-1], cursor, limit)

    def get_runs_with_pipeline_name(self, pipeline_name, cursor=None, limit=None):
        check.str_param(pipeline_name, 'pipeline_name')
        return self._slice(
            [r for r in self.all_runs() if r.pipeline_name == pipeline_name], cursor, limit
        )

    def get_runs_with_matching_tag(self, key, value, cursor=None, limit=None):
        check.str_param(key, 'key')
        check.str_param(value, 'value')
        return self._slice([r for r in self.all_runs() if r.tags.get(key) == value], cursor, limit)

    def _slice(self, runs, cursor, limit):
        if cursor:
            try:
                index = next(i for i, run in enumerate(runs) if run.run_id == cursor)
            except StopIteration:
                return []
            start = index + 1
        else:
            start = 0

        if limit:
            end = start + limit
        else:
            end = None

        return list(runs)[start:end]

    def get_run_by_id(self, run_id):
        check.str_param(run_id, 'run_id')
        return self._runs.get(run_id)

    def get_run_tags(self):
        result = defaultdict(set)
        for r in self.all_runs():
            for k, v in r.tags:
                result[k].add(v)

        return result.items()

    def get_runs_with_status(self, run_status, cursor=None, limit=None):
        check.inst_param(run_status, 'run_status', PipelineRunStatus)
        matching_runs = list(
            filter(lambda run: run.status == run_status, reversed(self._runs.values()))
        )
        return self._slice(matching_runs, cursor=cursor, limit=limit)

    def has_run(self, run_id):
        check.str_param(run_id, 'run_id')
        return run_id in self._runs

    def delete_run(self, run_id):
        check.str_param(run_id, 'run_id')
        del self._runs[run_id]

    def wipe(self):
        self._runs = OrderedDict()


RunStorageSQLMetadata = db.MetaData()
RunsTable = db.Table(
    'runs',
    RunStorageSQLMetadata,
    db.Column('id', db.Integer, primary_key=True, autoincrement=True),
    db.Column('run_id', db.String(255), unique=True),
    db.Column('pipeline_name', db.String),
    db.Column('status', db.String(63)),
    db.Column('run_body', db.String),
    db.Column('create_timestamp', db.DateTime, server_default=db.text('CURRENT_TIMESTAMP')),
    db.Column('update_timestamp', db.DateTime, server_default=db.text('CURRENT_TIMESTAMP')),
)

RunTagsTable = db.Table(
    'run_tags',
    RunStorageSQLMetadata,
    db.Column('id', db.Integer, primary_key=True, autoincrement=True),
    db.Column('run_id', None, db.ForeignKey('runs.run_id')),
    db.Column('key', db.String),
    db.Column('value', db.String),
)

create_engine = db.create_engine  # exported


class SQLRunStorage(RunStorage):  # pylint: disable=no-init
    @abstractmethod
    def connect(self):
        ''' context manager yielding a connection '''

    def add_run(self, pipeline_run):
        check.inst_param(pipeline_run, 'pipeline_run', PipelineRun)

        conn = self.connect()
        runs_insert = RunsTable.insert().values(  # pylint: disable=no-value-for-parameter
            run_id=pipeline_run.run_id,
            pipeline_name=pipeline_run.pipeline_name,
            status=pipeline_run.status.value,
            run_body=serialize_dagster_namedtuple(pipeline_run),
        )
        conn.execute(runs_insert)
        if pipeline_run.tags and len(pipeline_run.tags) > 0:
            conn.execute(
                RunTagsTable.insert(),  # pylint: disable=no-value-for-parameter
                [
                    dict(run_id=pipeline_run.run_id, key=k, value=v)
                    for k, v in pipeline_run.tags.items()
                ],
            )

        return pipeline_run

    def handle_run_event(self, run_id, event):
        check.str_param(run_id, 'run_id')
        check.inst_param(event, 'event', DagsterEvent)

        lookup = {
            DagsterEventType.PIPELINE_START: PipelineRunStatus.STARTED,
            DagsterEventType.PIPELINE_SUCCESS: PipelineRunStatus.SUCCESS,
            DagsterEventType.PIPELINE_FAILURE: PipelineRunStatus.FAILURE,
        }

        if event.event_type not in lookup:
            return

        run = self.get_run_by_id(run_id)
        if not run:
            # TODO log?
            return

        new_pipeline_status = lookup[event.event_type]

        self.connect().execute(
            RunsTable.update()  # pylint: disable=no-value-for-parameter
            .where(RunsTable.c.run_id == run_id)
            .values(
                status=new_pipeline_status.value,
                run_body=serialize_dagster_namedtuple(run.run_with_status(new_pipeline_status)),
                update_timestamp=datetime.now(),
            )
        )

    def _rows_to_runs(self, rows):
        return list(map(lambda r: deserialize_json_to_dagster_namedtuple(r[0]), rows))

    def _build_query(self, query, cursor, limit):
        ''' Helper function to deal with cursor/limit pagination args '''

        if cursor:
            cursor_query = db.select([RunsTable.c.id]).where(RunsTable.c.run_id == cursor)
            query = query.where(RunsTable.c.id < cursor_query)

        if limit:
            query = query.limit(limit)

        query = query.order_by(RunsTable.c.id.desc())
        return query

    def all_runs(self, cursor=None, limit=None):
        '''Return all the runs present in the storage.

        Returns:
            List[PipelineRun]: Tuples of run_id, pipeline_run.
        '''
        query = self._build_query(db.select([RunsTable.c.run_body]), cursor, limit)
        rows = self.connect().execute(query).fetchall()
        return self._rows_to_runs(rows)

    def get_runs_with_pipeline_name(self, pipeline_name, cursor=None, limit=None):
        '''Return all the runs present in the storage for a given pipeline.

        Args:
            pipeline_name (str): The pipeline to index on

        Returns:
            List[PipelineRun]: Tuples of run_id, pipeline_run.
        '''
        check.str_param(pipeline_name, 'pipeline_name')

        base_query = db.select([RunsTable.c.run_body]).where(
            RunsTable.c.pipeline_name == pipeline_name
        )
        query = self._build_query(base_query, cursor, limit)
        rows = self.connect().execute(query).fetchall()
        return self._rows_to_runs(rows)

    def get_runs_with_matching_tag(self, key, value, cursor=None, limit=None):
        base_query = (
            db.select([RunsTable.c.run_body])
            .select_from(RunsTable.join(RunTagsTable))
            .where(db.and_(RunTagsTable.c.key == key, RunTagsTable.c.value == value))
        )
        query = self._build_query(base_query, cursor, limit)
        rows = self.connect().execute(query).fetchall()
        return self._rows_to_runs(rows)

    def get_runs_with_status(self, run_status, cursor=None, limit=None):
        check.inst_param(run_status, 'run_status', PipelineRunStatus)

        base_query = db.select([RunsTable.c.run_body]).where(RunsTable.c.status == run_status.value)
        query = self._build_query(base_query, cursor, limit)
        rows = self.connect().execute(query).fetchall()
        return self._rows_to_runs(rows)

    def get_run_by_id(self, run_id):
        '''Get a run by its id.

        Args:
            run_id (str): The id of the run

        Returns:
            Optional[PipelineRun]
        '''
        check.str_param(run_id, 'run_id')

        query = db.select([RunsTable.c.run_body]).where(RunsTable.c.run_id == run_id)
        rows = self.connect().execute(query).fetchall()
        return deserialize_json_to_dagster_namedtuple(rows[0][0]) if len(rows) else None

    def get_run_tags(self):
        result = dict()
        query = db.select([RunTagsTable.c.key, RunTagsTable.c.value]).distinct(RunTagsTable.c.value)
        rows = self.connect().execute(query).fetchall()
        for r in rows:
            if r[0] not in result:
                result[r[0]] = [r[1]]
            else:
                result[r[0]].append(r[1])
        return result.items()

    def has_run(self, run_id):
        check.str_param(run_id, 'run_id')
        return bool(self.get_run_by_id(run_id))

    def delete_run(self, run_id):
        check.str_param(run_id, 'run_id')
        query = db.delete(RunsTable).where(RunsTable.c.run_id == run_id)
        self.connect().execute(query)

    def wipe(self):
        '''Clears the run storage.'''
        conn = self.connect()
        conn.execute(RunsTable.delete())  # pylint: disable=no-value-for-parameter
        conn.execute(RunTagsTable.delete())  # pylint: disable=no-value-for-parameter
