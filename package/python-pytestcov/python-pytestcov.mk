################################################################################
#
# python-pytest-cov
#
################################################################################

PYTHON_PYTESTCOV_VERSION = 4.1.0
PYTHON_PYTESTCOV_SOURCE = pytest-cov-$(PYTHON_PYTESTCOV_VERSION).tar.gz
PYTHON_PYTESTCOV_SITE = https://pypi.python.org/packages/source/p/pytest-cov
PYTHON_PYTESTCOV_LICENSE = MIT
PYTHON_PYTESTCOV_LICENSE_FILES = LICENSE-PSF LICENSE
PYTHON_PYTESTCOV_SETUP_TYPE = setuptools
# This is a runtime dependency, but we don't have the concept of
# runtime dependencies for host packages.

$(eval $(python-package))
