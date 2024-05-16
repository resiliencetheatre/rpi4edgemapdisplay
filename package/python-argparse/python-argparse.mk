################################################################################
#
# python-argparse
#
################################################################################

PYTHON_ARGPARSE_VERSION = 1.4.0
PYTHON_ARGPARSE_SOURCE = argparse-$(PYTHON_ARGPARSE_VERSION).tar.gz
PYTHON_ARGPARSE_SITE = https://files.pythonhosted.org/packages/18/dd/e617cfc3f6210ae183374cd9f6a26b20514bbb5a792af97949c5aacddf0f
PYTHON_ARGPARSE_SETUP_TYPE = setuptools
PYTHON_ARGPARSE_LICENSE = Python Software Foundation License
PYTHON_ARGPARSE_LICENSE_FILES = LICENSE.txt doc/source/license.rst

$(eval $(python-package))
