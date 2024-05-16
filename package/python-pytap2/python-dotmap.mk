################################################################################
#
# python-pytap2
#
################################################################################

PYTHON_PYTAP2_VERSION = 2.3.0
PYTHON_PYTAP2_SOURCE = pytap2-$(PYTHON_PYTAP2_VERSION).tar.gz
PYTHON_PYTAP2_SITE = https://pypi.python.org/packages/source/p/pytap2
PYTHON_PYTAP2_LICENSE = MIT
PYTHON_PYTAP2_LICENSE_FILES = LICENSE-PSF LICENSE
PYTHON_PYTAP2_SETUP_TYPE = setuptools
# This is a runtime dependency, but we don't have the concept of
# runtime dependencies for host packages.

$(eval $(python-package))
