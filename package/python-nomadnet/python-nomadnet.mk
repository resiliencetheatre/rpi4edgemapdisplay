################################################################################
#
# python-nomadnet
#
# https://pypi.org/project/nomadnet/
# https://files.pythonhosted.org/packages/4c/1f/52e2cb9510108583a74ff8b46c77650ce4e14b811759f93f82e2b3583e6b/nomadnet-0.4.9.tar.gz
#
################################################################################

PYTHON_NOMADNET_VERSION = 0.4.9
PYTHON_NOMADNET_SOURCE = nomadnet-$(PYTHON_NOMADNET_VERSION).tar.gz
PYTHON_NOMADNET_SITE = https://files.pythonhosted.org/packages/4c/1f/52e2cb9510108583a74ff8b46c77650ce4e14b811759f93f82e2b3583e6b
PYTHON_NOMADNET_LICENSE = MIT
PYTHON_NOMADNET_LICENSE_FILES = LICENSE-PSF LICENSE
PYTHON_NOMADNET_SETUP_TYPE = setuptools
# This is a runtime dependency, but we don't have the concept of
# runtime dependencies for host packages.

$(eval $(python-package))
