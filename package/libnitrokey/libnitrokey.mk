################################################################################
#
# libnitrokey
#
################################################################################

LIBNITROKEY_VERSION = v3.8
LIBNITROKEY_SITE = $(call github,Nitrokey,libnitrokey,$(LIBNITROKEY_VERSION))
LIBNITROKEY_DEPENDENCIES = libusb libargon2 libhid ccid hidapi
LIBNITROKEY_INSTALL_STAGING = YES
LIBNITROKEY_AUTORECONF = YES
LIBNITROKEY_LICENSE = GPL-2.0
LIBNITROKEY_LICENSE_FILES = COPYING

$(eval $(cmake-package))
