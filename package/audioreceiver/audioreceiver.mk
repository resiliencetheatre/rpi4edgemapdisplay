AUDIORECEIVER_VERSION = 773eb72b8ec564a664dd25d00cbedf7ccf826b4f
AUDIORECEIVER_SITE = https://codeberg.org/48554e6d/audioreceiver.git
AUDIORECEIVER_SITE_METHOD = git
AUDIORECEIVER_DEPENDENCIES = gstreamer1 gst1-plugins-base
AUDIORECEIVER_PREFIX = $(TARGET_DIR)/usr
AUDIORECEIVER_LICENSE = gplv2

define AUDIORECEIVER_BUILD_CMDS
     $(MAKE) $(TARGET_CONFIGURE_OPTS) -C $(@D)
endef


define AUDIORECEIVER_INSTALL_TARGET_CMDS
        (cd $(@D); cp audioreceiver $(AUDIORECEIVER_PREFIX)/bin)
endef

define AUDIORECEIVER_CLEAN_CMDS
        $(MAKE) $(AUDIORECEIVER_MAKE_OPTS) -C $(@D) clean
endef

$(eval $(generic-package))
