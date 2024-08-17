################################################################################
#
# python-meshtastic
#
################################################################################

PYTHON_MESHTASTIC_VERSION = a8d86dee2db53c60e701b17b37f0943dfb0e19c3
PYTHON_MESHTASTIC_SITE = https://github.com/meshtastic/python.git
PYTHON_MESHTASTIC_SITE_METHOD = git
PYTHON_MESHTASTIC_LICENSE = GNU General Public License v3 (GPLv3)
PYTHON_MESHTASTIC_LICENSE_FILES = LICENSE-PSF LICENSE
PYTHON_MESHTASTIC_SETUP_TYPE = setuptools
# This is a runtime dependency, but we don't have the concept of
# runtime dependencies for host packages.

$(eval $(python-package))
