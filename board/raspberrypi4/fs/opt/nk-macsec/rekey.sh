#!/bin/sh
#
# This script is run by udev rule '90-nk-macsec.rules' when Nitrokey storage
# is inserted to RPi. Check '90-nk-macsec.rules' if you use PRO2 model, now
# USB id's are matching for STORAGE model (20a0:4109).
#
# RPi is used as 'macsec router' and it will perform following functions when
# Nitrokey is inserted:
#
# 1) udev rule runs 'rekey.sh'
# 2) 'rekey.sh' will re-key 16 hosts based on 'mac-adddress-list.txt' content
# 3) 'rekey.sh' will delete and recreate 'macsec0' interface for RPi by
#    running 'macsec.sh' script which is created by 'nk-macsec'.
# 4) After RPi rekeys Nitrokey & configures it's own interfaces, you should
#    insert Nitrokey to other hosts which have 'nk-macsec' environment in place.
# 5) Each hosts will do rekey based on keys stored on Nitrokey.
#
# So your routine to 'rekey macsec' is to insert Nitrokey first to RPi and
# after this to each host(s) you prefer having macsec secured LAN connectivity.
#
#

#
# Requirements:
#
# Check 'pin code' and 'mac-adddress-list.txt' to match your environment.
#
# NOTE: First mac adress on 'mac-adddress-list.txt' should always be RPi.
#

#
# Let's wait that Storage is mounting first (we don't use storage capacity)
#

#
# Rekey macsec to Nitrokey
#
# This is role of RPi only as it's macsec router
#

/bin/nk-macsec -p 123456 -s -i eth0 -f /opt/nk-macsec/mac-adddress-list.txt 

#
# Generate macsec.sh
#
# Since '-o' and '-r' is not used, nk-macsec generates script
# without 'sudo' and 'routing' commands. This is what RPi requires.
#

/bin/nk-macsec -p 123456 -g -i eth0 > /opt/nk-macsec/macsec.sh

chmod +x /opt/nk-macsec/macsec.sh

#
# Uncomment following lines after you verify that macsec.sh is correct
# and your macsec configuration works.
#


#
# Execute macsec.sh
#
# /opt/nk-macsec/macsec.sh

#
# Optional, uncomment this to remove macsec.sh after it's run:
#
# rm /opt/nk-macsec/macsec.sh


exit 0

