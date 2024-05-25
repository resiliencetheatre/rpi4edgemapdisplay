NETMON_VERSION = 3a6706a91f6e4c5e1a6ee82854427d2ce67ff6ce
NETMON_SITE = $(call github,resiliencetheatre,netmon,$(NETMON_VERSION))
NETMON_PREFIX = $(TARGET_DIR)/usr
NETMON_LICENSE = gplv3

define NETMON_BUILD_CMDS
     $(MAKE) $(TARGET_CONFIGURE_OPTS) -C $(@D)
endef

define NETMON_INSTALL_TARGET_CMDS
        (cd $(@D); cp netmon $(NETMON_PREFIX)/bin)
endef

define NETMON_CLEAN_CMDS
        $(MAKE) $(NETMON_MAKE_OPTS) -C $(@D) clean
endef

$(eval $(generic-package))

