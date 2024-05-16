################################################################################
#
# python-pdoc3
#
################################################################################

PYTHON_PDOC3_VERSION = 3ecfbcfb658c5be9ee6ab572b63db2cb5e1c29e1
PYTHON_PDOC3_SITE = $(call github,pdoc3,pdoc,$(PYTHON_PDOC3_VERSION))
PYTHON_PDOC3_LICENSE = GNU Affero General Public License v3
PYTHON_PDOC3_LICENSE_FILES = LICENSE-PSF LICENSE
PYTHON_PDOC3_SETUP_TYPE = setuptools
# This is a runtime dependency, but we don't have the concept of
# runtime dependencies for host packages.

$(eval $(python-package))
