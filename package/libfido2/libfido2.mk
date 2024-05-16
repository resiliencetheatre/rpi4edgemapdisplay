################################################################################
#
# LIBFIDO2
#
#
################################################################################

LIBFIDO2_VERSION = d43923aa47f18846e41c437b9b19727c93c716cc
LIBFIDO2_SITE = $(call github,resiliencetheatre,libfido2,$(LIBFIDO2_VERSION))
LIBFIDO2_DEPENDENCIES = libcbor pcsc-lite udev
LIBFIDO2_INSTALL_STAGING = YES
LIBFIDO2_AUTORECONF = YES
LIBFIDO2_CONF_OPTS = -DBUILD_MANPAGES=OFF -DBUILD_EXAMPLES=OFF -DNFC_LINUX=OFF -DUSE_WINHELLO=OFF
LIBFIDO2_LICENSE_FILES = LICENSE

$(eval $(cmake-package))
