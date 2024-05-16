################################################################################
#
# coturn
#
################################################################################

COTURN_VERSION = 4.6.2
COTURN_SITE = $(call github,coturn,coturn,$(COTURN_VERSION))
COTURN_DEPENDENCIES = libevent
COTURN_INSTALL_STAGING = YES
COTURN_AUTORECONF = YES
COTURN_LICENSE_FILES = COPYING

$(eval $(cmake-package))
