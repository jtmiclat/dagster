import os
from collections import namedtuple
from glob import glob

import six
import yaml

from dagster import check
from dagster.core.errors import DagsterInvalidDefinitionError, DagsterInvariantViolationError
from dagster.utils.yaml_utils import merge_yamls

from .mode import DEFAULT_MODE_NAME


class PresetDefinition(namedtuple('_PresetDefinition', 'name environment_dict solid_subset mode')):
    '''Defines a preset configuration that a pipeline can execute in. Presets can be used in Dagit to
    load the predefined configuration in to the tool, or in a script or test as follows:

    .. code-block:: python

        execute_pipeline_with_preset(pipeline_def, 'example')


    Args:
        name (str):
            Name of this preset, must be unique amongst presets for a pipeline.
        environment_files (Optional[List[str]]):
            List of paths or glob patterns for yaml files to load and parse as the enivornment
            config for this preset.
        solid_subset (Optional[List[str]]):
            The list of names of solid invocations to execute for this preset.
        mode (Optional[str]):
            The mode to apply when executing this preset. Defaults to 'default'.
    '''

    @staticmethod
    def from_files(name, environment_files=None, solid_subset=None, mode=None):
        check.str_param(name, 'name')
        environment_files = check.opt_list_param(environment_files, 'environment_files')
        solid_subset = check.opt_nullable_list_param(solid_subset, 'solid_subset', of_type=str)
        mode = check.opt_str_param(mode, 'mode', DEFAULT_MODE_NAME)

        file_set = set()
        for file_glob in environment_files or []:
            files = glob(file_glob)
            if not files:
                raise DagsterInvalidDefinitionError(
                    'File or glob pattern "{file_glob}" for "environment_files" in preset '
                    '"{name}" produced no results.'.format(name=name, file_glob=file_glob)
                )

            file_set.update(map(os.path.realpath, files))

        try:
            merged = merge_yamls(list(file_set))
        except yaml.YAMLError as err:
            six.raise_from(
                DagsterInvariantViolationError(
                    'Encountered error attempting to parse yaml. Parsing files {file_set} '
                    'loaded by file/patterns {files} on preset "{name}".'.format(
                        file_set=file_set, files=environment_files, name=name
                    )
                ),
                err,
            )

        return PresetDefinition(name, merged, solid_subset, mode)

    def __new__(cls, name, environment_dict=None, solid_subset=None, mode=None):
        return super(PresetDefinition, cls).__new__(
            cls,
            name=check.str_param(name, 'name'),
            environment_dict=check.opt_dict_param(environment_dict, 'environment_dict'),
            solid_subset=check.opt_nullable_list_param(solid_subset, 'solid_subset', of_type=str),
            mode=check.opt_str_param(mode, 'mode', DEFAULT_MODE_NAME),
        )

    def get_environment_yaml(self):
        return yaml.dump(self.environment_dict, default_flow_style=False)
