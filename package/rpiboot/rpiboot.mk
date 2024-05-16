RPIBOOT_VERSION = 726256d938d3eca88b80dc119c9294457d74ecae
RPIBOOT_SITE = https://github.com/raspberrypi/usbboot
RPIBOOT_SITE_METHOD = git
RPIBOOT_DEPENDENCIES = libusb
RPIBOOT_PREFIX = $(TARGET_DIR)/usr

define RPIBOOT_BUILD_CMDS
     $(MAKE) $(TARGET_CONFIGURE_OPTS) -C $(@D)
endef

define RPIBOOT_INSTALL_TARGET_CMDS
        (cd $(@D); cp rpiboot $(RPIBOOT_PREFIX)/bin)
endef

define RPIBOOT_CLEAN_CMDS
        $(MAKE) $(RPIBOOT_MAKE_OPTS) -C $(@D) clean
endef

$(eval $(generic-package))
