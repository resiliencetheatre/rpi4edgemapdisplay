#!/bin/sh
# Adde route to wireguard server via current default gw:
# ip r add [wg host] via [default gw]
# Delete current default gw:
# ip r del default via [default gw]
# Route all traffic through wireguard server:
# ip r add default via 10.0.0.1
exit 0
