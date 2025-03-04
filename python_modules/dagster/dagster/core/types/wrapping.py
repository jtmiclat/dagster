import typing

from dagster import check
from dagster.core.errors import DagsterInvalidDefinitionError

from .builtin_enum import BuiltinEnum
from .typing_api import get_optional_inner_type, is_closed_python_optional_type, is_python_list_type


class WrappingType(object):
    def __init__(self, inner_type):
        # Cannot check inner_type because of circular references and no fwd declarations

        if inner_type == BuiltinEnum.NOTHING:
            raise DagsterInvalidDefinitionError(
                'Type Nothing can not be wrapped in List or Optional'
            )

        self.inner_type = inner_type


class WrappingListType(WrappingType):
    pass


class WrappingNullableType(WrappingType):
    pass


def remap_to_dagster_list_type(ttype):
    check.invariant(is_python_list_type(ttype), 'type must pass is_python_list_type check')
    if ttype == list or ttype == typing.List:
        return WrappingListType(BuiltinEnum.ANY)
    return WrappingListType(ttype.__args__[0])


def remap_to_dagster_optional_type(ttype):
    check.invariant(
        is_closed_python_optional_type(ttype), 'type must pass is_closed_python_optional_type check'
    )
    return WrappingNullableType(get_optional_inner_type(ttype))


List = typing.List

Optional = typing.Optional
