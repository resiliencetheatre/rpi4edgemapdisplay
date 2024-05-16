UDPTUNNEL_VERSION = 5fb992e448f95bdfa0a3e36f3b1cf63c658649f7
UDPTUNNEL_SITE = $(call github,0xe71d154d,udptunnel,$(UDPTUNNEL_VERSION))
UDPTUNNEL_PREFIX = $(TARGET_DIR)/usr

define UDPTUNNEL_BUILD_CMDS
     $(MAKE) $(TARGET_CONFIGURE_OPTS) -C $(@D)
endef

define UDPTUNNEL_INSTALL_TARGET_CMDS
        (cd $(@D); cp client server $(UDPTUNNEL_PREFIX)/bin)
endef

define UDPTUNNEL_CLEAN_CMDS
        $(MAKE) $(UDPTUNNEL_MAKE_OPTS) -C $(@D) clean
endef

$(eval $(generic-package))
