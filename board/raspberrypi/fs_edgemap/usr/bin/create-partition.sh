#!/bin/sh
if [ -d "/mnt/lost+found" ]
then
    echo "/mnt partition found!"
    if [ -f "/mnt/bootstrap.sh" ]
    then
     echo "bootstrap.sh found, executing it"
     /mnt/bootstrap.sh
    else
     echo "no bootstrap.sh detected"
    fi
else
    echo "Creating encrypted partition"
    TARGET_DEV=/dev/mmcblk0
    parted --script $TARGET_DEV 'mkpart primary ext4 850 -1'

    # LUKS format partitions
    # This requires user input
    cryptsetup luksFormat --type luks2 ${TARGET_DEV}p3

    # Enrol FIDO2
    echo "Enrolling FIDO2 token to partitions:"
    echo "${TARGET_DEV}p3"
    echo "Be ready to press FIDO2 token, when LED is flashing..."
    sleep 1
    systemd-cryptenroll --fido2-device=auto --fido2-with-client-pin=false --fido2-with-user-presence=false ${TARGET_DEV}p3

    # LUKS open
    echo "LUKS open.."
    cryptsetup luksOpen ${TARGET_DEV}p3 encrypted_data

    echo "Creating filesystems..."
    # Creating filesystems
    mkfs.ext4 /dev/mapper/encrypted_data

fi
exit 0

