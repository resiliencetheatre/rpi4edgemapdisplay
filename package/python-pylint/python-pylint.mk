################################################################################
#
# python-pylint
#
################################################################################

PYTHON_PYLINT_VERSION = 3.0.3
PYTHON_PYLINT_SOURCE = pylint-$(PYTHON_PYLINT_VERSION).tar.gz
PYTHON_PYLINT_SITE = https://pypi.python.org/packages/source/p/pylint
PYTHON_PYLINT_LICENSE = GNU General Public License v2 (GPLv2)
PYTHON_PYLINT_LICENSE_FILES = LICENSE-PSF LICENSE
PYTHON_PYLINT_SETUP_TYPE = setuptools
# This is a runtime dependency, but we don't have the concept of
# runtime dependencies for host packages.

$(eval $(python-package))
