# rpi-edgemap (initramfs, meshtastic)

External tree for [buildroot](https://buildroot.org) to build RaspberryPi4 based [Edgemap](https://resilience-theatre.com/edgemap/) firmware image. 

![meshtastic](https://github.com/resiliencetheatre/rpi4edgemapdisplay/blob/main/doc/meshtastic-kit.png?raw=true)

## Features

This repository contains edgeUI for browser based mapping with [Protomaps](https://protomaps.com/) and message delivery 
over [Meshtastic](https://meshtastic.org/) radios. Setup is tested with [LILYGO LoRa32 V2.1_1.6 radios](https://www.lilygo.cc/products/lora3).

This repository is enhanced version of [Edgemap](https://resilience-theatre.com/edgemap/) firmware image for
[Raspberry Pi4](https://en.wikipedia.org/wiki/Raspberry_Pi) and does not need tileserver-gl to serve 
mbtiles. All maps are pmtiles handled by [maplibre-gl-js](https://github.com/maplibre/maplibre-gl-js) library.

Image contains [taky](https://github.com/tkuester/taky) a simple [COT](https://www.mitre.org/sites/default/files/pdf/09_4937.pdf) server 
for [ATAK](https://tak.gov/products). CoT server is mainly targeted to read CoT targets in network and illustrate them on Web user interface.
This functionality was tested with [AN/PRC-169](https://silvustechnologies.com/) radios.

![videoconference](https://github.com/resiliencetheatre/rpi4edgemapdisplay/blob/main/doc/videoconference.png?raw=true)

Image contains TLS encryption for Web UI connection and offers experimental video conference for 6 team members directly from map user interface.
Video conference is based on WebRTC and is implemented with [Janus](https://github.com/meetecho/janus-gateway) by Meetecho. Please note that
TLS is really bad for your OPSEC and I generally would like to use other means to secure connectivity. But with consumer grade EUD's and browsers
we are forced to use TLS to make WebRTC working. 

![localdisplay](https://github.com/resiliencetheatre/rpi4edgemapdisplay/blob/main/doc/hyperpixel.png?raw=true)

QT 5.11.5 is enabled for build and it allows us to do small and simple local [user interface](https://github.com/resiliencetheatre/qrencode-ui) 
to [Hyperpixel 4](https://shop.pimoroni.com/products/hyperpixel-4?variant=12569485443155) touch screen.

Buildroot is used to embedded Linux image and it provides boot and rootfs partitions on single MicroSD card. On first boot user can
create third partition to facilitate map data (pmtiles), terrain model and optional imagery files. 

For [operations security](https://en.wikipedia.org/wiki/Operations_security) we can use optional Linux Unified Key Setup (LUKS) to encrypt data partition on same MicroSD card (or external USB drive).
Since we aim to use RPi4 in headless configuration we use [systemd-cryptsetup](https://www.freedesktop.org/software/systemd/man/latest/systemd-cryptsetup@.service.html)
with [FIDO2](https://shop.nitrokey.com/shop/product/nkfi2-nitrokey-fido2-55) key. With this approach we can start unit to fully operational state with FIDO2
key plugged in to USB port and after unit is booted (and LUKS partitions are opened) - we can remove FIDO2 key. 

Browser usable user interface allows wide range of end user devices (EUD's) without any additional software installs. Check out [edgemap-ui](https://github.com/resiliencetheatre/edgemap-ui) repository
for more details how Edgemap can be integrated to various systems.

This version does NOT have high rate target, simulations, CoT reading and [AN/PRC-169](https://silvustechnologies.com/) support. 

If you choose to use browser based geolocation, configure installation to use TLS connection. 

## Meshtastic

Meshtastic implementation is still highly experimental and contains only message delivery over meshtastic radios. Following
picture gives overview how FIFO pipes are used to deliver payload to/from radios.

![meshtastic](https://github.com/resiliencetheatre/rpi4edgemapdisplay/blob/main/doc/meshtastic.png?raw=true)

This meshtasic branch is configured to use second partition for maps, elevation model and imagery without encryption. And some of messaging 
channel functions have been commented out on UI code. We don't deliver 'drag marker' or 'geolocation' over meshtastic and we have increased
presence indication sending interval to 2 minute.


## Building

To build edgemap firmware, you need to install Buildroot environment and clone this repository 
as 'external tree' to buildroot. Make sure you check buildroot manual for required packages 
for your host, before building.

```
mkdir ~/build-directory
cd ~/build-directory
git clone https://git.buildroot.net/buildroot
git clone https://github.com/resiliencetheatre/rpi4edgemapdisplay
```

Current build uses master branch of buildroot. Build is tested with cfda1f0b87ebfb7686b82f319c531d4d28fdfd67.

Modify `rpi-firmware` package file and change firmware version tag to
match kernel version (6.6.30) we're using. 

```
# package/rpi-firmware/rpi-firmware.mk
RPI_FIRMWARE_VERSION = 83dafbc92c0e63f76ca2ecdd42462d56489d1c77
```

Disable hash check by deleting hash file:

```
cd ~/build-directory/buildroot
rm package/rpi-firmware/rpi-firmware.hash
```

After you're stable with kernel and firmware versions, re-create hash file.

Define _external tree_ location to **BR2_EXTERNAL** variable:

```
export BR2_EXTERNAL=~/build-directory/rpiedgemap
```

Make edgemap configuration (defconfig) and start building:

```
cd ~/build-directory/buildroot
make rpi4_edgemap_display_web_filetransfer_defconfig
make
```

After build is completed, you find image file for MicroSD card at:

```
~/build-directory/buildroot/output/images/sdcard.img
```

Use 'dd' to copy this image to your MicroSD card.

## Configuration

By default meshtastic branch works without FIDO2 enabled encryption, use `create-partition-noenc.sh` script to partition remaining space on your MicroSD card.

Place pmtiles to your MicroSD second partition and link them under /opt/edgemap/edgeui/ on running instance. Modify also styles/style.json to 
match amount of sources available.

## Map data

You need to have full [planet OSM](https://maps.protomaps.com/builds/) pmtiles and A global terrain RGB dataset from [Mapzen Joerd](https://github.com/tilezen/joerd) project.

## Local GPS

Meshtastic branch has [gpsd ](https://gpsd.io/) package which can read your locally attached GPS receiver(s) and expose
location information to localhost socket. There is also [gpsreader](https://github.com/resiliencetheatre/gpsreader) as
buildroot package and it's used to read gpsd socket and output location string to fifo file. This fifo is delivered to 
map UI via websocket. 

Locally connected GPS is good companion for Edgemap with Meshtastic radios. Typically browser based geolocation (also present 
in edgemap UI) requires TLS connection between EUD (client) and edgemap (server). Since TLS connection requires complex and
meta data enriched certificates to be present and real time (difficult to obtain in battle space) we offer edgemap UI without
TLS to local network connected EUD's. Browser geolocation requires also Cell, Wifi and BT to be active (stupidity in battle space) for optimum results.

You can configure GPS serial port:

```
# /etc/default/gpsd
DEVICES="/dev/ttyUSB1"
```

You can modify this file before build at external directory:

```
board/raspberrypi/fs_edgemap_initramfs/etc/default/gpsd
```

You could also use 'bootstrap.sh' to replace that file and restart service, 'bootstrap.sh' is run on boot from boot partition.

Daemon (gpsd) and 'gpsreader' is started automatically after you plug GPS in USB port.
