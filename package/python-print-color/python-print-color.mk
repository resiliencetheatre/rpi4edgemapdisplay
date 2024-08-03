################################################################################
#
# python-printcolor
#
# https://files.pythonhosted.org/packages/eb/32/601fd9002509b32d1f9d3ec1e8cc5af9af619def83327adbb1ea18e1502a/print_color-0.4.6.tar.gz
################################################################################

PYTHON_PRINT_COLOR_VERSION = 0.4.6
PYTHON_PRINT_COLOR_SOURCE = print_color-$(PYTHON_PRINT_COLOR_VERSION).tar.gz
PYTHON_PRINT_COLOR_SITE = https://files.pythonhosted.org/packages/eb/32/601fd9002509b32d1f9d3ec1e8cc5af9af619def83327adbb1ea18e1502a
PYTHON_PRINT_COLOR_LICENSE = MIT
PYTHON_PRINT_COLOR_LICENSE_FILES = LICENSE-PSF LICENSE
PYTHON_PRINT_COLOR_SETUP_TYPE = setuptools
# This is a runtime dependency, but we don't have the concept of
# runtime dependencies for host packages.

$(eval $(python-package))
