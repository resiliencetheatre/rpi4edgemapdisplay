################################################################################
#
# python-pysubpub
#
################################################################################

PYTHON_PUBSUB_VERSION = v4.0.3
PYTHON_PUBSUB_SOURCE = $(PYTHON_PUBSUB_VERSION).tar.gz
PYTHON_PUBSUB_SITE = https://github.com/schollii/pypubsub/archive/refs/tags
PYTHON_PUBSUB_LICENSE =  BSD License (BSD License)
PYTHON_PUBSUB_LICENSE_FILES = LICENSE-PSF LICENSE
PYTHON_PUBSUB_SETUP_TYPE = setuptools
# This is a runtime dependency, but we don't have the concept of
# runtime dependencies for host packages.

$(eval $(python-package))
