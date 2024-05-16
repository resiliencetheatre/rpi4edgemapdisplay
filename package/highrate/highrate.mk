HIGHRATE_VERSION = a1213f944c26634f9334ef11661a6619a9a7d137
HIGHRATE_SITE = https://github.com/34vdf34/highrate.git
HIGHRATE_SITE_METHOD = git
HIGHRATE_DEPENDENCIES = libcurl
HIGHRATE_PREFIX = $(TARGET_DIR)/usr

define HIGHRATE_BUILD_CMDS
     $(MAKE) $(TARGET_CONFIGURE_OPTS) -C $(@D)
endef

define HIGHRATE_INSTALL_TARGET_CMDS
        (cd $(@D); cp highrate $(HIGHRATE_PREFIX)/bin)
endef

define HIGHRATE_CLEAN_CMDS
        $(MAKE) $(HIGHRATE_MAKE_OPTS) -C $(@D) clean
endef

$(eval $(generic-package))
