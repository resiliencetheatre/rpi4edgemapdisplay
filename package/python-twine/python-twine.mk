################################################################################
#
# python-twine
#
################################################################################

PYTHON_TWINE_VERSION = 4.0.2
PYTHON_TWINE_SOURCE = twine-$(PYTHON_TWINE_VERSION).tar.gz
PYTHON_TWINE_SITE = https://pypi.python.org/packages/source/t/twine
PYTHON_TWINE_LICENSE = Apache
PYTHON_TWINE_LICENSE_FILES = LICENSE-PSF LICENSE
PYTHON_TWINE_SETUP_TYPE = setuptools
# This is a runtime dependency, but we don't have the concept of
# runtime dependencies for host packages.

$(eval $(python-package))
