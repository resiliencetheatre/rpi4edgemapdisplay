################################################################################
#
# libcodec2
#
################################################################################

LIBCODEC2_VERSION = 1.2.0
LIBCODEC2_SITE = $(call github,drowe67,codec2,$(LIBCODEC2_VERSION))
LIBCODEC2_LICENSE = LGPL-2.1
LIBCODEC2_LICENSE_FILES = COPYING
LIBCODEC2_INSTALL_STAGING = YES
LIBCODEC2_SUPPORTS_IN_SOURCE_BUILD = NO
LIBCODEC2_CONF_OPTS = -DUNITTEST=OFF

define LIBCODEC2_INSTALL_TARGET_CMDS
        cp $(@D)/buildroot-build/src/c2dec $(TARGET_DIR)/usr/bin/
        cp $(@D)/buildroot-build/src/c2enc $(TARGET_DIR)/usr/bin/
        cp $(@D)/buildroot-build/src/fsk_* $(TARGET_DIR)/usr/bin/
        cp $(@D)/buildroot-build/src/ofdm_* $(TARGET_DIR)/usr/bin/
        cp $(@D)/buildroot-build/src/ldpc_* $(TARGET_DIR)/usr/bin/
        cp $(@D)/buildroot-build/src/freedv_* $(TARGET_DIR)/usr/bin/
        cp $(@D)/buildroot-build/src/vhf_* $(TARGET_DIR)/usr/bin/
endef

ifeq ($(BR2_PACKAGE_LIBCODEC2_EXAMPLES),y)
LIBCODEC2_CONF_OPTS += -DINSTALL_EXAMPLES=ON
endif

$(eval $(cmake-package))
