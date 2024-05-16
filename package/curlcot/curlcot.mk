CURLCOT_VERSION = 357320d04af42b9fd32b6521cc03cf91b47ae4bc
CURLCOT_SITE = https://codeberg.org/48554e6d/curlcot.git
CURLCOT_SITE_METHOD = git
CURLCOT_DEPENDENCIES = libcurl
CURLCOT_PREFIX = $(TARGET_DIR)/usr

define CURLCOT_BUILD_CMDS
     $(MAKE) $(TARGET_CONFIGURE_OPTS) -C $(@D)
endef

define CURLCOT_INSTALL_TARGET_CMDS
        (cd $(@D); cp curlcot $(CURLCOT_PREFIX)/bin)
endef

define CURLCOT_CLEAN_CMDS
        $(MAKE) $(CURLCOT_MAKE_OPTS) -C $(@D) clean
endef

$(eval $(generic-package))
