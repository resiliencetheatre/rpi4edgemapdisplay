GSOCKET_VERSION = ad546b2e63f562d351ee45bb758fab9ba34936a2
GSOCKET_SITE = $(call github,hackerschoice,gsocket,$(GSOCKET_VERSION))
GSOCKET_PREFIX = $(TARGET_DIR)/usr
GSOCKET_INSTALL_STAGING = YES
GSOCKET_AUTORECONF = YES
GSOCKET_CONF_OPTS = --disable-tools --disable-static

$(eval $(autotools-package))


