################################################################################
#
# python-meshtastic
#
################################################################################
PYTHON_MESHTASTIC_VERSION = 2.3.12
# PYTHON_MESHTASTIC_VERSION = 2.4.0
# PYTHON_MESHTASTIC_VERSION = bcce5687c5385cfae43fa5b7e8d064d264d3cfb1
PYTHON_MESHTASTIC_SITE = https://github.com/meshtastic/python.git
PYTHON_MESHTASTIC_SITE_METHOD = git
PYTHON_MESHTASTIC_LICENSE = GNU General Public License v3 (GPLv3)
PYTHON_MESHTASTIC_LICENSE_FILES = LICENSE-PSF LICENSE
PYTHON_MESHTASTIC_SETUP_TYPE = setuptools
# This is a runtime dependency, but we don't have the concept of
# runtime dependencies for host packages.

$(eval $(python-package))
