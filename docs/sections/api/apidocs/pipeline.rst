.. currentmodule:: dagster

Pipelines
=========

Pipeline definitions
--------------------
.. autodecorator:: pipeline

.. autoclass:: PipelineDefinition

Dependencies and aliases
------------------------
.. autoclass:: DependencyDefinition

.. autoclass:: SolidInvocation

----

Modes
=====

.. autoclass:: ModeDefinition

----

Resources
=========

.. autodecorator:: resource

.. autoclass:: ResourceDefinition
    :members:

.. autoclass:: InitResourceContext
    :members:

----

Logging
=======

.. autodecorator:: logger

.. autoclass:: LoggerDefinition

.. autoclass:: InitLoggerContext

.. autoclass:: DagsterLogManager
    :members:

----

Presets
=======

.. autoclass:: PresetDefinition
    :members:

----

Executors
=========
.. autodecorator:: executor

.. autoclass:: ExecutorDefinition

.. autoclass:: InitExecutorContext
    :members:

.. autoclass:: ExecutorConfig
    :members:

.. autoclass:: Engine
    :members:

----

Repositories
============

.. autoclass:: RepositoryDefinition
    :members:
