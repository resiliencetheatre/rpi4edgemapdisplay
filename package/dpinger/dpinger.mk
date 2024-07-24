DPINGER_VERSION = fbc7e8f87f595fd4d5693b99f5db04cd7904f0f3
DPINGER_SITE = $(call github,resiliencetheatre,dpinger,$(DPINGER_VERSION))
DPINGER_PREFIX = $(TARGET_DIR)/usr

define DPINGER_BUILD_CMDS
     $(MAKE) $(TARGET_CONFIGURE_OPTS) -C $(@D)
endef

define DPINGER_INSTALL_TARGET_CMDS
        (cd $(@D); cp dpinger $(DPINGER_PREFIX)/bin)
endef

define DPINGER_CLEAN_CMDS
        $(MAKE) $(DPINGER_MAKE_OPTS) -C $(@D) clean
endef

$(eval $(generic-package))
