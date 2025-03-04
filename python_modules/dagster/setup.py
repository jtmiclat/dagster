import argparse
import sys

from setuptools import find_packages, setup


def long_description():
    return '''
## Dagster
Dagster is a system for building modern data applications.

Combining an elegant programming model and beautiful tools, Dagster allows infrastructure engineers,
data engineers, and data scientists to seamlessly collaborate to process and produce the trusted,
reliable data needed in today's world.
'''.strip()


def get_version(name):
    version = {}
    with open('dagster/version.py') as fp:
        exec(fp.read(), version)  # pylint: disable=W0122

    if name == 'dagster':
        return version['__version__']
    elif name == 'dagster-nightly':
        return version['__nightly__']
    else:
        raise Exception('Shouldn\'t be here: bad package name {name}'.format(name=name))


parser = argparse.ArgumentParser()
parser.add_argument('--nightly', action='store_true')


def _do_setup(name='dagster'):
    setup(
        name=name,
        version=get_version(name),
        author='Elementl',
        license='Apache-2.0',
        description='Dagster is an opinionated programming model for data pipelines.',
        long_description=long_description(),
        long_description_content_type='text/markdown',
        url='https://github.com/dagster-io/dagster',
        classifiers=[
            'Programming Language :: Python :: 2.7',
            'Programming Language :: Python :: 3.5',
            'Programming Language :: Python :: 3.6',
            'Programming Language :: Python :: 3.7',
            'License :: OSI Approved :: Apache Software License',
            'Operating System :: OS Independent',
        ],
        packages=find_packages(exclude=['dagster_tests']),
        install_requires=[
            # standard python 2/3 compatability things
            'enum-compat>=0.0.1',
            'future',
            'funcsigs',
            'contextlib2>=0.5.4',
            'pathlib2>=2.3.4; python_version<"3"',
            # cli
            'click>=5.0',
            'coloredlogs>=6.1',
            'graphviz>=0.8.4',
            # pyyaml pinned for compatibility with docker-compose
            # https://github.com/docker/compose/blob/master/setup.py#L35
            'PyYAML>=3.10,<5',
            # core (not explicitly expressed atm)
            'gevent==1.3.7',
            'pyrsistent>=0.14.8',
            'rx==1.6.1',
            'six>=1.11.0',
            'sqlalchemy>=1.0',
            'typing; python_version<"3"',
            'backports.tempfile; python_version<"3"',
            'toposort>=1.0',
            'watchdog>=0.8.3',
            'psutil >= 1.0; platform_system=="Windows"',
        ],
        tests_require=['mock'],
        entry_points={'console_scripts': ['dagster = dagster.cli:main']},
    )


if __name__ == '__main__':
    parsed, unparsed = parser.parse_known_args()
    sys.argv = [sys.argv[0]] + unparsed
    if parsed.nightly:
        _do_setup('dagster-nightly')
    else:
        _do_setup('dagster')
