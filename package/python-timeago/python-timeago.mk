################################################################################
#
# python-timeago
#
################################################################################

PYTHON_TIMEAGO_VERSION = 1.0.16
PYTHON_TIMEAGO_SOURCE = timeago-$(PYTHON_TIMEAGO_VERSION).tar.gz
PYTHON_TIMEAGO_SITE = $(call github,hustcc,timeago,$(PYTHON_TIMEAGO_VERSION))
PYTHON_TIMEAGO_LICENSE = MIT
PYTHON_TIMEAGO_LICENSE_FILES = LICENSE-PSF LICENSE
PYTHON_TIMEAGO_SETUP_TYPE = setuptools
# This is a runtime dependency, but we don't have the concept of
# runtime dependencies for host packages.

$(eval $(python-package))
