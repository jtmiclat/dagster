import typing
from functools import partial

import six

from dagster import check
from dagster.core.storage.type_storage import TypeStoragePlugin

from .builtin_config_schemas import BuiltinSchemas
from .builtin_enum import BuiltinEnum
from .config import List as ConfigList
from .config import Nullable as ConfigNullable
from .config_schema import InputHydrationConfig, OutputMaterializationConfig
from .dagster_type import check_dagster_type_param
from .field_utils import Dict
from .marshal import PickleSerializationStrategy, SerializationStrategy
from .typing_api import (
    is_closed_python_dict_type,
    is_closed_python_set_type,
    is_closed_python_tuple_type,
)
from .wrapping import WrappingListType, WrappingNullableType


class RuntimeType(object):
    '''
    The class backing DagsterTypes as they are used during execution.
    '''

    def __init__(
        self,
        key,
        name,
        is_builtin=False,
        description=None,
        input_hydration_config=None,
        output_materialization_config=None,
        serialization_strategy=None,
        auto_plugins=None,
    ):

        type_obj = type(self)
        if type_obj in RuntimeType.__cache:
            check.failed(
                (
                    '{type_obj} already in cache. You **must** use the inst() class method '
                    'to construct RuntimeType and not the ctor'.format(type_obj=type_obj)
                )
            )

        self.key = check.str_param(key, 'key')
        self.name = check.opt_str_param(name, 'name')
        self.description = check.opt_str_param(description, 'description')
        self.input_hydration_config = check.opt_inst_param(
            input_hydration_config, 'input_hydration_config', InputHydrationConfig
        )
        self.output_materialization_config = check.opt_inst_param(
            output_materialization_config,
            'output_materialization_config',
            OutputMaterializationConfig,
        )
        self.serialization_strategy = check.opt_inst_param(
            serialization_strategy,
            'serialization_strategy',
            SerializationStrategy,
            PickleSerializationStrategy(),
        )

        auto_plugins = check.opt_list_param(auto_plugins, 'auto_plugins', of_type=type)

        check.param_invariant(
            all(
                issubclass(auto_plugin_type, TypeStoragePlugin) for auto_plugin_type in auto_plugins
            ),
            'auto_plugins',
        )

        self.auto_plugins = auto_plugins

        self.is_builtin = check.bool_param(is_builtin, 'is_builtin')

    __cache = {}

    @classmethod
    def inst(cls):
        if cls not in RuntimeType.__cache:
            RuntimeType.__cache[cls] = cls()  # pylint: disable=E1120
        return RuntimeType.__cache[cls]

    @staticmethod
    def from_builtin_enum(builtin_enum):
        check.invariant(BuiltinEnum.contains(builtin_enum), 'must be member of BuiltinEnum')
        return _RUNTIME_MAP[builtin_enum]

    @property
    def display_name(self):
        return self.name

    def type_check(self, value):
        pass

    @property
    def is_any(self):
        return False

    @property
    def is_scalar(self):
        return False

    @property
    def is_list(self):
        return False

    @property
    def is_nullable(self):
        return False

    @property
    def inner_types(self):
        return []

    @property
    def is_nothing(self):
        return False


class BuiltinScalarRuntimeType(RuntimeType):
    def __init__(self, *args, **kwargs):
        name = type(self).__name__
        super(BuiltinScalarRuntimeType, self).__init__(
            key=name, name=name, is_builtin=True, *args, **kwargs
        )

    @property
    def is_scalar(self):
        return True


class Int(BuiltinScalarRuntimeType):
    def __init__(self):
        super(Int, self).__init__(
            input_hydration_config=BuiltinSchemas.INT_INPUT,
            output_materialization_config=BuiltinSchemas.INT_OUTPUT,
        )

    def type_check(self, value):
        from dagster.core.definitions.events import Failure

        if not isinstance(value, six.integer_types):
            raise Failure(_typemismatch_error_str(value, 'int'))


def _typemismatch_error_str(value, expected_type_desc):
    return 'Value "{value}" of python type "{python_type}" must be a {type_desc}.'.format(
        value=value, python_type=type(value).__name__, type_desc=expected_type_desc
    )


def _throw_if_not_string(value):
    from dagster.core.definitions.events import Failure

    if not isinstance(value, six.string_types):
        raise Failure(_typemismatch_error_str(value, 'string'))


class String(BuiltinScalarRuntimeType):
    def __init__(self):
        super(String, self).__init__(
            input_hydration_config=BuiltinSchemas.STRING_INPUT,
            output_materialization_config=BuiltinSchemas.STRING_OUTPUT,
        )

    def type_check(self, value):
        _throw_if_not_string(value)


class Path(BuiltinScalarRuntimeType):
    def __init__(self):
        super(Path, self).__init__(
            input_hydration_config=BuiltinSchemas.PATH_INPUT,
            output_materialization_config=BuiltinSchemas.PATH_OUTPUT,
        )

    def type_check(self, value):
        _throw_if_not_string(value)


class Float(BuiltinScalarRuntimeType):
    def __init__(self):
        super(Float, self).__init__(
            input_hydration_config=BuiltinSchemas.FLOAT_INPUT,
            output_materialization_config=BuiltinSchemas.FLOAT_OUTPUT,
        )

    def type_check(self, value):
        from dagster.core.definitions.events import Failure

        if not isinstance(value, float):
            raise Failure(_typemismatch_error_str(value, 'float'))


class Bool(BuiltinScalarRuntimeType):
    def __init__(self):
        super(Bool, self).__init__(
            input_hydration_config=BuiltinSchemas.BOOL_INPUT,
            output_materialization_config=BuiltinSchemas.BOOL_OUTPUT,
        )

    def type_check(self, value):
        from dagster.core.definitions.events import Failure

        if not isinstance(value, bool):
            raise Failure(_typemismatch_error_str(value, 'bool'))


class Anyish(RuntimeType):
    def __init__(
        self,
        key,
        name,
        input_hydration_config=None,
        output_materialization_config=None,
        is_builtin=False,
        description=None,
    ):
        super(Anyish, self).__init__(
            key=key,
            name=name,
            input_hydration_config=input_hydration_config,
            output_materialization_config=output_materialization_config,
            is_builtin=is_builtin,
            description=description,
        )

    @property
    def is_any(self):
        return True


class Any(Anyish):
    def __init__(self):
        super(Any, self).__init__(
            key='Any',
            name='Any',
            input_hydration_config=BuiltinSchemas.ANY_INPUT,
            output_materialization_config=BuiltinSchemas.ANY_OUTPUT,
            is_builtin=True,
        )


def define_any_type(name, description=None):
    class NamedAnyType(Anyish):
        def __init__(self):
            super(NamedAnyType, self).__init__(key=name, name=name, description=description)

    return NamedAnyType


class Nothing(RuntimeType):
    def __init__(self):
        super(Nothing, self).__init__(
            key='Nothing',
            name='Nothing',
            input_hydration_config=None,
            output_materialization_config=None,
            is_builtin=True,
        )

    @property
    def is_nothing(self):
        return True

    def type_check(self, value):
        from dagster.core.definitions.events import Failure

        if value is not None:
            raise Failure('Value {value} must be None.')


class PythonObjectType(RuntimeType):
    def __init__(
        self,
        python_type=None,
        key=None,
        name=None,
        typecheck_metadata_fn=None,
        type_check=None,
        **kwargs
    ):
        name = check.opt_str_param(name, 'name', type(self).__name__)
        key = check.opt_str_param(key, 'key', name)
        super(PythonObjectType, self).__init__(key=key, name=name, **kwargs)
        self.python_type = check.type_param(python_type, 'python_type')
        self.typecheck_metadata_fn = check.opt_callable_param(
            typecheck_metadata_fn, 'typecheck_metadata_fn'
        )
        self._user_type_check = check.opt_callable_param(type_check, 'type_check')

    def type_check(self, value):
        from dagster.core.definitions.events import Failure

        if self._user_type_check is not None:
            self._user_type_check(value)
        elif not isinstance(value, self.python_type):
            raise Failure(
                'Value of type {value_type} failed type check for Dagster type {dagster_type}, '
                'expected value to be of Python type {expected_type}.'.format(
                    value_type=type(value),
                    dagster_type=self.name,
                    expected_type=self.python_type.__name__,
                )
            )

        if self.typecheck_metadata_fn:
            return self.typecheck_metadata_fn(value)


PYTHON_DAGSTER_TYPE_ARGS_DOCSTRING = '''Args:
    python_type (cls): The python type to wrap as a Dagster type.
    name (Optional[str]): Name of the new Dagster type. If None, the name (__name__) of the
        python_type will be used. Default: None
    description (Optional[str]): A user-readable description of the type. Default: None.
    input_hydration_config (Optional[InputHydrationConfig]): An instance of a class that inherits
        from :py:class:`InputHydrationConfig <dagster.InputHydrationConfig>` and can map config
        data to a value of this type. Specify this argument if you will need to shim values of this
        type using the config machinery. As a rule, you should use the 
        :py:func:`@input_hydration_config <dagster.InputHydrationConfig>` decorator to construct
        these arguments. Default: None
    output_materialization_config (Optiona[OutputMaterializationConfig]): An instance of a class
        that inherits from
        :py:class:`OutputMaterializationConfig <dagster.OutputMaterializationConfig>` that can
        persist values of this type. As a rule, you should use the 
        :py:func:`@output_materialization_config <dagster.output_materialization_config>` decorator
        to construct these arguments. Default: None
    serialization_strategy (Optional[SerializationStrategy]): An instance of a class that inherits
        from :py:class:`SerializationStrategy <dagster.SerializationStrategy>`. The default strategy
        for serializing this value when automatically persisting it between execution steps. You
        should set this value if the ordinary serialization machinery (e.g., pickle) will not be
        adequate for this type. Default: None.
    auto_plugins (Optional[List[TypeStoragePlugin]]): If types must be serialized differently
        depending on the storage being used for intermediates, they should specify this argument.
        In these cases the serialization_strategy argument is not sufficient because serialization
        requires specialized API calls, e.g. to call an s3 API directly instead of using a generic
        file object. See dagster_pyspark.DataFrame for an example using auto_plugins. Default: None.
    typecheck_metadata_fn (Optional[Callable[[Any], TypeCheck]]): If specified, this function will
        be called to emit metadata when you successfully check a type. The typecheck_metadata_fn
        will be passed the value being type-checked and should return an instance of
        :py:class:`TypeCheck <dagster.TypeCheck>`. See dagster_pandas.DataFrame for an example.
        Default: None.
    type_check (Optional[Callable[[Any], Any]]): If specified, this function will be called in
        place of the default isinstance type check. This function should raise Failure if the
        type check fails, and otherwise pass. Its return value will be ignored.'''


def define_python_dagster_type(
    python_type,
    name=None,
    description=None,
    input_hydration_config=None,
    output_materialization_config=None,
    serialization_strategy=None,
    auto_plugins=None,
    typecheck_metadata_fn=None,
    type_check=None,
):
    '''Define a dagster type corresponding to an existing python type.

    It's very common to want to generate a dagster type corresponding to an existing Python type.
    Typically this is done using the @dagster_type decorator or using as_dagster_type, each of
    which defer to this function as a workhorse.

    Usage:

        DateTime = define_python_dagster_type(datetime.datetime, name='DateTime')
    
    {args_docstring}
    '''.format(
        args_docstring=PYTHON_DAGSTER_TYPE_ARGS_DOCSTRING
    )

    check.type_param(python_type, 'python_type')
    check.opt_str_param(name, 'name', python_type.__name__)
    check.opt_str_param(description, 'description')
    check.opt_inst_param(input_hydration_config, 'input_hydration_config', InputHydrationConfig)
    check.opt_inst_param(
        output_materialization_config, 'output_materialization_config', OutputMaterializationConfig
    )
    check.opt_inst_param(
        serialization_strategy,
        'serialization_strategy',
        SerializationStrategy,
        default=PickleSerializationStrategy(),
    )

    auto_plugins = check.opt_list_param(auto_plugins, 'auto_plugins', of_type=type)
    check.param_invariant(
        all(issubclass(auto_plugin_type, TypeStoragePlugin) for auto_plugin_type in auto_plugins),
        'auto_plugins',
    )

    check.opt_callable_param(typecheck_metadata_fn, 'typecheck_metadata_fn')
    check.opt_callable_param(type_check, 'type_check')

    class _ObjectType(PythonObjectType):
        def __init__(self):
            super(_ObjectType, self).__init__(
                python_type=python_type,
                name=name,
                description=description,
                input_hydration_config=input_hydration_config,
                output_materialization_config=output_materialization_config,
                serialization_strategy=serialization_strategy,
                auto_plugins=auto_plugins,
                typecheck_metadata_fn=typecheck_metadata_fn,
                type_check=type_check,
            )

    return _ObjectType


def _create_nullable_input_schema(inner_type):
    if not inner_type.input_hydration_config:
        return None

    nullable_type = ConfigNullable(inner_type.input_hydration_config.schema_type).inst()

    class _NullableSchema(InputHydrationConfig):
        @property
        def schema_type(self):
            return nullable_type

        def construct_from_config_value(self, context, config_value):
            if config_value is None:
                return None
            return inner_type.input_hydration_config.construct_from_config_value(
                context, config_value
            )

    return _NullableSchema()


class NullableType(RuntimeType):
    def __init__(self, inner_type):
        key = 'Optional.' + inner_type.key
        super(NullableType, self).__init__(
            key=key, name=None, input_hydration_config=_create_nullable_input_schema(inner_type)
        )
        self.inner_type = inner_type

    @property
    def display_name(self):
        return self.inner_type.display_name + '?'

    def type_check(self, value):
        return None if value is None else self.inner_type.type_check(value)

    @property
    def is_nullable(self):
        return True

    @property
    def inner_types(self):
        return [self.inner_type] + self.inner_type.inner_types


def _create_list_input_schema(inner_type):
    if not inner_type.input_hydration_config:
        return None

    list_type = ConfigList(inner_type.input_hydration_config.schema_type).inst()

    class _ListSchema(InputHydrationConfig):
        @property
        def schema_type(self):
            return list_type

        def construct_from_config_value(self, context, config_value):
            convert_item = partial(
                inner_type.input_hydration_config.construct_from_config_value, context
            )
            return list(map(convert_item, config_value))

    return _ListSchema()


class ListType(RuntimeType):
    def __init__(self, inner_type):
        key = 'List.' + inner_type.key
        super(ListType, self).__init__(
            key=key, name=None, input_hydration_config=_create_list_input_schema(inner_type)
        )
        self.inner_type = inner_type

    @property
    def display_name(self):
        return '[' + self.inner_type.display_name + ']'

    def type_check(self, value):
        from dagster.core.definitions.events import Failure

        if not isinstance(value, list):
            raise Failure('Value must be a list, got {value}'.format(value=value))

        for item in value:
            self.inner_type.type_check(item)

    @property
    def is_list(self):
        return True

    @property
    def inner_types(self):
        return [self.inner_type] + self.inner_type.inner_types


def Optional(inner_type):
    check.inst_param(inner_type, 'inner_type', RuntimeType)

    class _Nullable(NullableType):
        def __init__(self):
            super(_Nullable, self).__init__(inner_type)

    return _Nullable.inst()


def List(inner_type):
    check.inst_param(inner_type, 'inner_type', RuntimeType)

    class _List(ListType):
        def __init__(self):
            super(_List, self).__init__(inner_type)

    return _List.inst()


class Stringish(RuntimeType):
    def __init__(self, key=None, name=None, **kwargs):
        name = check.opt_str_param(name, 'name', type(self).__name__)
        key = check.opt_str_param(key, 'key', name)
        super(Stringish, self).__init__(
            key=key,
            name=name,
            input_hydration_config=BuiltinSchemas.STRING_INPUT,
            output_materialization_config=BuiltinSchemas.STRING_OUTPUT,
            **kwargs
        )

    @property
    def is_scalar(self):
        return True

    def type_check(self, value):
        return _throw_if_not_string(value)


_RUNTIME_MAP = {
    BuiltinEnum.ANY: Any.inst(),
    BuiltinEnum.BOOL: Bool.inst(),
    BuiltinEnum.FLOAT: Float.inst(),
    BuiltinEnum.INT: Int.inst(),
    BuiltinEnum.PATH: Path.inst(),
    BuiltinEnum.STRING: String.inst(),
    BuiltinEnum.NOTHING: Nothing.inst(),
}


def resolve_to_runtime_type(dagster_type):
    # circular dep
    from .mapping import remap_python_type
    from .python_dict import PythonDict, create_typed_runtime_dict
    from .python_set import PythonSet, create_typed_runtime_set
    from .python_tuple import PythonTuple, create_typed_tuple

    dagster_type = remap_python_type(dagster_type)

    # do not do in remap because this is runtime system only.
    if is_closed_python_dict_type(dagster_type):
        return create_typed_runtime_dict(dagster_type.__args__[0], dagster_type.__args__[1]).inst()

    if is_closed_python_tuple_type(dagster_type):
        return create_typed_tuple(*dagster_type.__args__).inst()

    if is_closed_python_set_type(dagster_type):
        return create_typed_runtime_set(dagster_type.__args__[0]).inst()

    check_dagster_type_param(dagster_type, 'dagster_type', RuntimeType)

    if dagster_type is None:
        return Any.inst()

    if dagster_type is Dict or dagster_type is typing.Dict:
        return PythonDict.inst()
    if dagster_type is typing.Tuple:
        return PythonTuple.inst()
    if dagster_type is typing.Set:
        return PythonSet.inst()
    if BuiltinEnum.contains(dagster_type):
        return RuntimeType.from_builtin_enum(dagster_type)
    if isinstance(dagster_type, WrappingListType):
        return resolve_to_runtime_list(dagster_type)
    if isinstance(dagster_type, WrappingNullableType):
        return resolve_to_runtime_nullable(dagster_type)
    if issubclass(dagster_type, RuntimeType):
        return dagster_type.inst()

    check.failed('should not reach')


def resolve_to_runtime_list(list_type):
    check.inst_param(list_type, 'list_type', WrappingListType)
    return List(resolve_to_runtime_type(list_type.inner_type))


def resolve_to_runtime_nullable(nullable_type):
    check.inst_param(nullable_type, 'nullable_type', WrappingNullableType)
    return Optional(resolve_to_runtime_type(nullable_type.inner_type))


ALL_RUNTIME_BUILTINS = set(_RUNTIME_MAP.values())


def construct_runtime_type_dictionary(solid_defs):
    type_dict = {t.name: t for t in ALL_RUNTIME_BUILTINS}
    for solid_def in solid_defs:
        for runtime_type in solid_def.all_runtime_types():
            type_dict[runtime_type.name] = runtime_type

    return type_dict
