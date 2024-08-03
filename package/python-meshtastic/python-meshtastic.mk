################################################################################
#
# python-meshtastic
#
################################################################################

PYTHON_MESHTASTIC_VERSION = d996965f0f11a8a8a459b1658bac1996f13f769e
PYTHON_MESHTASTIC_SITE = https://github.com/meshtastic/python.git
PYTHON_MESHTASTIC_SITE_METHOD = git
PYTHON_MESHTASTIC_LICENSE = GNU General Public License v3 (GPLv3)
PYTHON_MESHTASTIC_LICENSE_FILES = LICENSE-PSF LICENSE
PYTHON_MESHTASTIC_SETUP_TYPE = setuptools
# This is a runtime dependency, but we don't have the concept of
# runtime dependencies for host packages.

$(eval $(python-package))
