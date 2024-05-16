GSOCKET_VERSION = e605c1102710a43da733dd7fb286ddc4f0af0484
GSOCKET_SITE = $(call github,resiliencetheatre,gsocket,$(GSOCKET_VERSION))
GSOCKET_PREFIX = $(TARGET_DIR)/usr
GSOCKET_INSTALL_STAGING = YES
GSOCKET_AUTORECONF = YES
GSOCKET_CONF_OPTS = --disable-tools --disable-static

$(eval $(autotools-package))


