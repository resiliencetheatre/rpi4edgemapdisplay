COTSIM_VERSION = 43c5c69a99034ec8530f9d5a6a8c3ca4017344e3
COTSIM_SITE = https://codeberg.org/48554e6d/cotsim.git
COTSIM_SITE_METHOD = git
COTSIM_DEPENDENCIES = libcurl
COTSIM_PREFIX = $(TARGET_DIR)/usr

define COTSIM_BUILD_CMDS
     $(MAKE) $(TARGET_CONFIGURE_OPTS) -C $(@D)
endef

define COTSIM_INSTALL_TARGET_CMDS
        (cd $(@D); cp cotsim $(COTSIM_PREFIX)/bin)
endef

define COTSIM_CLEAN_CMDS
        $(MAKE) $(COTSIM_MAKE_OPTS) -C $(@D) clean
endef

$(eval $(generic-package))
