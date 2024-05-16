QTENCODEUI_VERSION = d8afc382eb89ee8b84c706b8288e864435599d11
QTENCODEUI_SITE = $(call github,resiliencetheatre,qrencode-ui,$(QTENCODEUI_VERSION))
QTENCODEUI_DEPENDENCIES = qt5base qt5quickcontrols2
QTENCODEUI_PREFIX = $(TARGET_DIR)/usr

MYQMAKE = $(TOPDIR)/output/host/usr/bin/qmake

define QTENCODEUI_CONFIGURE_CMDS
	(cd $(@D) && $(MYQMAKE) -r PREFIX=$(QTENCODEUI_PREFIX))
endef

define QTENCODEUI_BUILD_CMDS
	$(MAKE) -C $(@D)
endef

define QTENCODEUI_INSTALL_TARGET_CMDS
        (cd $(@D); cp qt-widget $(QTENCODEUI_PREFIX)/bin)

endef

$(eval $(generic-package))

