################################################################################
#
# python-meshtastic
#
# 2.2.20
# 2.3.11
################################################################################

PYTHON_MESHTASTIC_VERSION = 2.3.11
PYTHON_MESHTASTIC_SOURCE = meshtastic-$(PYTHON_MESHTASTIC_VERSION).tar.gz
PYTHON_MESHTASTIC_SITE = https://pypi.python.org/packages/source/m/meshtastic
PYTHON_MESHTASTIC_LICENSE = GNU General Public License v3 (GPLv3)
PYTHON_MESHTASTIC_LICENSE_FILES = LICENSE-PSF LICENSE
PYTHON_MESHTASTIC_SETUP_TYPE = setuptools
# This is a runtime dependency, but we don't have the concept of
# runtime dependencies for host packages.

$(eval $(python-package))
