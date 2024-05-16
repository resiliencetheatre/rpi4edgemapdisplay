################################################################################
#
# python-tabulate
#
################################################################################

PYTHON_TABULATE_VERSION = 0.9.0
PYTHON_TABULATE_SOURCE = tabulate-$(PYTHON_TABULATE_VERSION).tar.gz
PYTHON_TABULATE_SITE = https://pypi.python.org/packages/source/t/tabulate
PYTHON_TABULATE_LICENSE = MIT
PYTHON_TABULATE_LICENSE_FILES = LICENSE-PSF LICENSE
PYTHON_TABULATE_SETUP_TYPE = setuptools
# This is a runtime dependency, but we don't have the concept of
# runtime dependencies for host packages.

$(eval $(python-package))
