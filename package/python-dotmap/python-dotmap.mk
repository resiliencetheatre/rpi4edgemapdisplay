################################################################################
#
# python-dotmap
#
################################################################################

PYTHON_DOTMAP_VERSION = 1.3.30
PYTHON_DOTMAP_SOURCE = dotmap-$(PYTHON_DOTMAP_VERSION).tar.gz
PYTHON_DOTMAP_SITE = https://pypi.python.org/packages/source/d/dotmap
PYTHON_DOTMAP_LICENSE = MIT
PYTHON_DOTMAP_LICENSE_FILES = LICENSE-PSF LICENSE
PYTHON_DOTMAP_SETUP_TYPE = setuptools
# This is a runtime dependency, but we don't have the concept of
# runtime dependencies for host packages.

$(eval $(python-package))
