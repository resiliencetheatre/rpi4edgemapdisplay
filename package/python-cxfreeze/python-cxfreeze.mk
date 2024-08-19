################################################################################
#
# python-cxfreeze
#
# https://pypi.org/project/cx-Freeze/
# https://files.pythonhosted.org/packages/99/1b/9311b5208783164f357c0d851a1ba28acc0d69b0d6d2a3352669cf62d509/lxmf-0.4.4.tar.gz
# https://files.pythonhosted.org/packages/6e/23/6947cd90cfe87712099fbeab2061309ab1d2a95d54f3453cb6bb21b00034/cx_freeze-7.2.0.tar.gz
#
################################################################################

PYTHON_CXFREEZE_VERSION = 7.2.0
PYTHON_CXFREEZE_SOURCE = cx_freeze-$(PYTHON_CXFREEZE_VERSION).tar.gz
PYTHON_CXFREEZE_SITE = https://files.pythonhosted.org/packages/6e/23/6947cd90cfe87712099fbeab2061309ab1d2a95d54f3453cb6bb21b00034
PYTHON_CXFREEZE_LICENSE = MIT
PYTHON_CXFREEZE_LICENSE_FILES = LICENSE-PSF LICENSE
PYTHON_CXFREEZE_SETUP_TYPE = setuptools
# This is a runtime dependency, but we don't have the concept of
# runtime dependencies for host packages.

$(eval $(python-package))
