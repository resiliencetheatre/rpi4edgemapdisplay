################################################################################
#
# python-autopep8
#
################################################################################

PYTHON_AUTOPEP8_VERSION = 2.0.4
PYTHON_AUTOPEP8_SOURCE = autopep8-$(PYTHON_AUTOPEP8_VERSION).tar.gz
PYTHON_AUTOPEP8_SITE = https://pypi.python.org/packages/source/a/autopep8
PYTHON_AUTOPEP8_LICENSE = MIT
PYTHON_AUTOPEP8_LICENSE_FILES = LICENSE-PSF LICENSE
PYTHON_AUTOPEP8_SETUP_TYPE = setuptools
# This is a runtime dependency, but we don't have the concept of
# runtime dependencies for host packages.

$(eval $(python-package))
