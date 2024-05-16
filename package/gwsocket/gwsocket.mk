################################################################################
#
# GWSOCKET
#
################################################################################

GWSOCKET_VERSION = f2d735454351c92c74a30356b5dc620a16feec90
GWSOCKET_SITE = $(call github,allinurl,gwsocket,$(GWSOCKET_VERSION))
GWSOCKET_AUTORECONF = YES
GWSOCKET_LICENSE = GPL-2.0
GWSOCKET_LICENSE_FILES = COPYING
GWSOCKET_CONF_OPTS= --with-openssl

$(eval $(autotools-package))
