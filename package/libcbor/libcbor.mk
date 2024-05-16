################################################################################
#
# LIBCBOR
#
################################################################################

LIBCBOR_VERSION = 49cb0bc43071f16e90c87db51caf2b7736e6e576
LIBCBOR_SITE = $(call github,PJK,libcbor,$(LIBCBOR_VERSION))
# LIBCBOR_DEPENDENCIES = libudev
LIBCBOR_INSTALL_STAGING = YES
LIBCBOR_AUTORECONF = YES
# LIBCBOR_LICENSE = GPL-2.0
LIBCBOR_LICENSE_FILES = LICENSE

$(eval $(cmake-package))
