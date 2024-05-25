UDPPROXY_VERSION = 98234e9cec5255b7f9432fb23b3ead739fcee1f4
UDPPROXY_SITE = $(call github,0x6c2d1f7b,udpproxy,$(UDPPROXY_VERSION))
UDPPROXY_PREFIX = $(TARGET_DIR)/usr

define UDPPROXY_BUILD_CMDS
     $(MAKE) $(TARGET_CONFIGURE_OPTS) -C $(@D)
endef

define UDPPROXY_INSTALL_TARGET_CMDS
        (cd $(@D); cp udpproxy $(UDPPROXY_PREFIX)/bin)
endef

define UDPPROXY_CLEAN_CMDS
        $(MAKE) $(UDPPROXY_MAKE_OPTS) -C $(@D) clean
endef

$(eval $(generic-package))
