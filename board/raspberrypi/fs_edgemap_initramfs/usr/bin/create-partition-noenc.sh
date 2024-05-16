#!/bin/sh

echo "Creating partition wihtout encryption"
TARGET_DEV=/dev/mmcblk0
parted --script $TARGET_DEV 'mkpart primary ext4 850 -1'

# Creating filesystems
echo "Creating filesystem to $TARGET_DEVp2"
mkfs.ext4 $TARGET_DEVp2

exit 0

