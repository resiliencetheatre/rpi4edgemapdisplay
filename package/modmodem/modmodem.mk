MODMODEM_VERSION = 19bfd3df2baee4a718e35c2eae982c838d47f433
MODMODEM_SITE = https://codeberg.org/48554e6d/modmodem.git
MODMODEM_SITE_METHOD = git
MODMODEM_PREFIX = $(TARGET_DIR)/usr

define MODMODEM_BUILD_CMDS
     $(MAKE) $(TARGET_CONFIGURE_OPTS) -C $(@D)
endef

define MODMODEM_INSTALL_TARGET_CMDS
        (cd $(@D); cp encode decode $(MODMODEM_PREFIX)/bin)
endef

define MODMODEM_CLEAN_CMDS
        $(MAKE) $(MODMODEM_MAKE_OPTS) -C $(@D) clean
endef

$(eval $(generic-package))
