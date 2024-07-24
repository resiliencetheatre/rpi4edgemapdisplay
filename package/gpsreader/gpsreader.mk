GPSREADER_VERSION = 4ceb4767b6f0fca8f494b71138c1daa9fbfa174e
GPSREADER_SITE = https://github.com/resiliencetheatre/gpsreader.git
GPSREADER_SITE_METHOD = git
GPSREADER_PREFIX = $(TARGET_DIR)/usr
GPSREADER_LICENSE = gplv3

define GPSREADER_BUILD_CMDS
     $(MAKE) $(TARGET_CONFIGURE_OPTS) -C $(@D)
endef

define GPSREADER_INSTALL_TARGET_CMDS
        (cd $(@D); cp gpsreader $(GPSREADER_PREFIX)/bin)
endef

define GPSREADER_CLEAN_CMDS
        $(MAKE) $(GPSREADER_MAKE_OPTS) -C $(@D) clean
endef

$(eval $(generic-package))
