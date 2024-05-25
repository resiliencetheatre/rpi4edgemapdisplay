PTTCOMM_VERSION = 7adb61c5b95aedf2fd97536d44459c7c011d909c
PTTCOMM_SITE = https://codeberg.org/48554e6d/pttcomm.git
PTTCOMM_SITE_METHOD = git
PTTCOMM_DEPENDENCIES = gstreamer1 gst1-plugins-base
PTTCOMM_PREFIX = $(TARGET_DIR)/usr
PTTCOMM_LICENSE = gplv2

define PTTCOMM_BUILD_CMDS
     $(MAKE) $(TARGET_CONFIGURE_OPTS) -C $(@D)
endef

define PTTCOMM_INSTALL_TARGET_CMDS
        (cd $(@D); cp pttcomm $(PTTCOMM_PREFIX)/bin)
endef

define PTTCOMM_CLEAN_CMDS
        $(MAKE) $(PTTCOMM_MAKE_OPTS) -C $(@D) clean
endef

$(eval $(generic-package))

