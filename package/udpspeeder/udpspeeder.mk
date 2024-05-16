UDPSPEEDER_VERSION = cac854ae844c0b023bdcf4f34a8b0d31a1ca8bef
UDPSPEEDER_SITE = https://github.com/resiliencetheatre/udpspeeder.git
UDPSPEEDER_SITE_METHOD = git
UDPSPEEDER_PREFIX = $(TARGET_DIR)/usr

define UDPSPEEDER_BUILD_CMDS
     $(MAKE) CXX=$(TARGET_CXX) -C $(@D)
endef

define UDPSPEEDER_INSTALL_TARGET_CMDS
        (cd $(@D); cp speederv2 $(UDPSPEEDER_PREFIX)/bin)
endef

define UDPSPEEDER_CLEAN_CMDS
        $(MAKE) $(UDPSPEEDER_MAKE_OPTS) -C $(@D) clean
endef

$(eval $(generic-package))
