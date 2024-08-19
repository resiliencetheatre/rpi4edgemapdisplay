################################################################################
#
# python-peewee
#
# https://pypi.org/project/peewee/
#
# https://files.pythonhosted.org/packages/bd/be/e9c886b4601a19f4c34a1b75c5fe8b98a2115dd964251a76b24c977c369d/peewee-3.17.6.tar.gz
#
################################################################################

PYTHON_PEEWEE_VERSION = 3.17.6
PYTHON_PEEWEE_SOURCE = peewee-$(PYTHON_PEEWEE_VERSION).tar.gz
PYTHON_PEEWEE_SITE = https://files.pythonhosted.org/packages/bd/be/e9c886b4601a19f4c34a1b75c5fe8b98a2115dd964251a76b24c977c369d
PYTHON_PEEWEE_LICENSE = MIT
PYTHON_PEEWEE_LICENSE_FILES = LICENSE-PSF LICENSE
PYTHON_PEEWEE_SETUP_TYPE = setuptools
# This is a runtime dependency, but we don't have the concept of
# runtime dependencies for host packages.

$(eval $(python-package))
