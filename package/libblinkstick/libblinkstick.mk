################################################################################
#
# libblinkstick https://github.com/ebenoist/libblinkstick.git
#
################################################################################

LIBBLINKSTICK_VERSION = 7bb5f2cc8c7896d25db6880e766489c99f77e918
LIBBLINKSTICK_SITE = https://codeberg.org/48554e6d/libblinkstick.git
LIBBLINKSTICK_SITE_METHOD = git
LIBBLINKSTICK_DEPENDENCIES = libusb libhid hidapi
LIBBLINKSTICK_INSTALL_STAGING = YES
LIBBLINKSTICK_AUTORECONF = YES
LIBBLINKSTICK_LICENSE = MIT
LIBBLINKSTICK_LICENSE_FILES = COPYING

$(eval $(cmake-package))
