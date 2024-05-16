NKMACSEC_VERSION = 5b0d35946b8d168676c888b5d8d9c5c9d85c723c
NKMACSEC_SITE = $(call github,resiliencetheatre,nk-macsec,$(NKMACSEC_VERSION))
NKMACSEC_DEPENDENCIES = libnitrokey
NKMACSEC_PREFIX = $(TARGET_DIR)/usr

define NKMACSEC_BUILD_CMDS
     $(MAKE) $(TARGET_CONFIGURE_OPTS) -C $(@D)
endef

define NKMACSEC_INSTALL_TARGET_CMDS
        (cd $(@D); cp nk-macsec $(NKMACSEC_PREFIX)/bin)
endef

define NKMACSEC_CLEAN_CMDS
        $(MAKE) $(NKMACSEC_MAKE_OPTS) -C $(@D) clean
endef

$(eval $(generic-package))
