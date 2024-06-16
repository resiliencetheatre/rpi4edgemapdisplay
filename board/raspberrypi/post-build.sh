#!/bin/sh

set -u
set -e

# Add a console on tty1
if [ -e ${TARGET_DIR}/etc/inittab ]; then
    grep -qE '^tty1::' ${TARGET_DIR}/etc/inittab || \
	sed -i '/GENERIC_SERIAL/a\
tty1::respawn:/sbin/getty -L  tty1 0 vt100 # HDMI console' ${TARGET_DIR}/etc/inittab
fi

# Remove janus-gateway.service
rm ${TARGET_DIR}/usr/lib/systemd/system/janus-gateway.service

# Alter permissions to /opt/edgemap-persist
chmod o+w ${TARGET_DIR}/opt/edgemap-persist
