################################################################################
#
# python-dateutils
#
################################################################################

PYTHON_DATEUTILS_VERSION = 0.6.12
PYTHON_DATEUTILS_SOURCE = dateutils-$(PYTHON_DATEUTILS_VERSION).tar.gz
PYTHON_DATEUTILS_SITE = https://files.pythonhosted.org/packages/70/2e/a2d1337ac0ebb32b3b4ad921d9621f8b2f6bb20de0da47ec5d3734f08ce2
PYTHON_DATEUTILS_SETUP_TYPE = setuptools
PYTHON_DATEUTILS_LICENSE = FIXME: please specify the exact BSD version
PYTHON_DATEUTILS_LICENSE_FILES = LICENSE

$(eval $(python-package))
