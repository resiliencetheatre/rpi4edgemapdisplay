# rpi-edgemap

**NOTE:** THIS REPOSITORY IS NOW INACTIVE AND DEVELOPMENT HAPPENS AT [rpi4edgemap](https://github.com/resiliencetheatre/rpi4edgemap) repository. This change took place at Oct 23, 2024.

Edgemap is small project built on embedded ARM targets like RaspberryPi4 and Raspberry Pi Zero 2W. It can be cross compiled to various other platforms and integrated to work with AMD64 based PC architectures. 

![meshtastic](https://github.com/resiliencetheatre/rpi4edgemapdisplay/blob/secureptt/doc/kit.png?raw=true)

System delivers small browser usable user interface where full world map can be accessed with any End User Device (EUD). Implementation is based on various open source projects like [Protomaps](https://protomaps.com/), [Meshtastic](https://meshtastic.org/) and [maplibre-gl-js](https://github.com/maplibre/maplibre-gl-js).

Please note that Edgemap is not complete product as such but offers great integration point to your own developments. 

## Features

System contains features which might work out of the box for you or require more detailed configuration. Especially networking, SecurePTT and CoT receiving requires quite deep knowledge and planning to be really useful. 

### CoT Server

Image contains [taky](https://github.com/tkuester/taky) a simple [COT](https://www.mitre.org/sites/default/files/pdf/09_4937.pdf) server for [ATAK](https://tak.gov/products). CoT server is mainly targeted to read CoT targets in network and illustrate them on Web user interface. 
This functionality was tested with [AN/PRC-169](https://silvustechnologies.com/) radios.

CoT implementation to battle space with TLS certificates is painful and dangerous. But as it's running on consumer platforms, there is really no options available, I believe.

### Video conference

![videoconference](https://github.com/resiliencetheatre/rpi4edgemapdisplay/blob/secureptt/doc/videoconference.png?raw=true)

Image contains TLS encryption for Web UI connection and offers experimental video conference for 6 team members directly from map user interface. Video conference is based on WebRTC and is implemented with [Janus](https://github.com/meetecho/janus-gateway) by Meetecho. Please note that TLS is really bad for your OPSEC and I generally would like to use other means to secure connectivity. But with consumer grade EUD's and browsers we are forced to use TLS to make WebRTC working. 

### Local display support & QT

![localdisplay](https://github.com/resiliencetheatre/rpi4edgemapdisplay/blob/secureptt/doc/hyperpixel.png?raw=true)

QT 5.11.5 is enabled for build and it allows us to do small and simple local [user interface](https://github.com/resiliencetheatre/qrencode-ui) to [Hyperpixel 4](https://shop.pimoroni.com/products/hyperpixel-4?variant=12569485443155) touch screen. This feature is currently proof of concept placeholder and contains no usable functionality. You could take this further with ease by using QT Creator and configuring it to use toolchain from buildroot environment. 

### Meshtastic 

By default this image contains message delivery over [Meshtastic](https://meshtastic.org/) LoRA radios. (This can be changed to IP bearer if you need more bandwidth to image transfers for example).

Setup is tested with [LILYGO LoRa32 V2.1_1.6 radios](https://www.lilygo.cc/products/lora3) and [Heltec V3](https://heltec.org/project/wifi-lora-32-v3/) radios and others should work after configuring correct serial port to "/opt/edgemap/meshpipe/meshtastic.env"

Meshtastic implementation is still highly experimental and contains only message delivery over meshtastic radios. Following picture gives overview how FIFO pipes are used to deliver payload to/from radios.

![meshtastic](https://github.com/resiliencetheatre/rpi4edgemapdisplay/blob/secureptt/doc/meshtastic.png?raw=true)

You can deliver MIL symbols as sensor markers between Edgemap nodes with 'sensorMarker' message. 

![meshtastic](https://github.com/resiliencetheatre/rpi4edgemapdisplay/blob/secureptt/doc/map.png?raw=true)

Copy paste following messages to message dialog on Edgemap UI and expect them to appear to other nodes map after delivery is done via Meshtastic radios.

```
sensorMarker|[58.9074826,23.5766601]|path13,GSM Network,30046000001302000000
sensorMarker|[58.3830883,27.3655486]|path14,Water pump control override,30066000001504000000
sensorMarker|[58.3102102,27.3957824]|path15,Cloud outages,30066000001608000000
sensorMarker|[58.2887415,27.6258087]|path17,GNSS L2,30065200001102000001
sensorMarker|[58.2887415,27.6258087]|path18,GNSS L2+L1,30065200001102000001
sensorMarker|[58.0967511,27.5097656]|path19,Hand over delays,30055200000000000000
sensorMarker|[58.1616254,27.1953678]|path20,Core router #12,30046000001402000000
sensorMarker|[58.2340188,27.4486541]|path21,Power outage,30046000001606000000
sensorMarker|[58.3786785,26.7249298]|path22,OT + Sensory team,30031000001505010000
sensorMarker|[58.2320306,27.3464727]|path23,Cellular Jamming,30011000001505040000Z
sensorMarker|[58.0549952,27.0552062]|path24,Starlink uplink detected 04:19,30015000001101000000
```

To save bandwidth on Meshtastic communication, some of messaging channel functions have been commented out on UI code. We don't deliver 'drag marker' or 'geolocation' over Meshtastic and we have increased presence indication sending interval to 2 minute.

### Meshtastic detection sensor

![meshtastic](https://github.com/resiliencetheatre/rpi4edgemapdisplay/blob/secureptt/doc/sensor-alarm.png?raw=true)

Edgemap contains simple example which shows you how to use Meshtastic node as detection sensor. Example is done with RAK wireless 
[Wisblock Meshtastic Starter Kit](https://store.rakwireless.com/products/wisblock-meshtastic-starter-kit?variant=43683420438726)
and you can use closing switch between J12: PIN1 (VDD) and J11: PIN2 (IO2). 

First you need to configure your Sensor unit. Note that 'detection_sensor.name' must contain given 
format and only ID ('12') can be changed by user, based on your sensor numbering.

```
meshtastic --port /dev/ttyACM0 --set detection_sensor.name "12|sensor|||"
meshtastic --port /dev/ttyACM0 --set detection_sensor.monitor_pin 34
meshtastic --port /dev/ttyACM0 --set detection_sensor.state_broadcast_secs 300
meshtastic --port /dev/ttyACM0 --set detection_sensor.minimum_broadcast_secs 5
meshtastic --port /dev/ttyACM0 --set detection_sensor.detection_triggered_high true
meshtastic --port /dev/ttyACM0 --set detection_sensor.enabled true
```

![meshtastic](https://github.com/resiliencetheatre/rpi4edgemapdisplay/blob/secureptt/doc/sensor-alarm-create.png?raw=true)

Configuring sensor to Edgemap is simple. You send one alarm event and Edgemap will show 'unknown sensor' indication, 
where you can pick location on map and give description. All further alarms are then shown on map.

Note that this implementation is still work in progress.

### Highrate

![highrate](https://github.com/resiliencetheatre/rpi4edgemapdisplay/blob/main/doc/highrate.png?raw=true)

You can also update highrate target information to map via websocket connection. See readme in highrate/ directory.

### Reticulum

Experimental support for reticulum network is included on build. Currently we have to disable meshtastic when reticulum is 
activated into use, but this might change in future. For reticulum there is "Reticulum MeshChat" included, which is
independent browser usable chat and nomad network access tool. Edgemap includes also messaging over lxmf/reticulum, which is highly
experimental at the moment. 

### SecurePTT

SecurePTT branch contains possbility to use small scale demo of full duplex Push-To-Talk (PTT) with exclusive level of security, where PTT streams are encrypted with One-Time-Pad (OTP). This functionality can be configured to following modes, depending on use case:

* Global unicast SecurePTT coverage via routing gateway servers 
* Global multicast SecurePTT coverage via routing gateway servers 
* Local MESH/MANET network segments 

SecurePTT offers flexibility to cipher your PTT streams and by default we use three layers to transport UDP packets between nodes. 

![tunnel](https://github.com/resiliencetheatre/rpi4edgemapdisplay/blob/secureptt/doc/secureptt-tunnel.png?raw=true)

Outermost level (A) can be selected to hide meta-data of layer (B) which encapsulates (C), One-Time-Pad encrypted stream between nodes. 

![streams](https://github.com/resiliencetheatre/rpi4edgemapdisplay/blob/secureptt/doc/SecurePTT-Keyed-Streams-3-peers.png?raw=true)

### PTT button wiring

Depending what audio hardware you choose to use, wiring of PTT button varies. You could use USB attached headset and utilize GPIO pin to act like a PTT button:

![gpioptt](https://github.com/resiliencetheatre/rpi4edgemapdisplay/blob/secureptt/doc/secureptt-GPIO-PTT-button.png?raw=true)

For [Codec Zero](https://www.raspberrypi.com/products/codec-zero/) with [Kenwood SMC-34](https://www.kenwood.eu/comm/accessories/audio/SMC-34/) wiring looks like this:

![codecptt](https://github.com/resiliencetheatre/rpi4edgemapdisplay/blob/secureptt/doc/rpi4ptt-codec-zero-wiring.png?raw=true)

### SecurePTT options

You can modify SecurePTT code to support Symmetric algorithms (if you find a math you can trust). Implementation supports also securing plain text UDP streams of your existing MESH/MANET gears like [AN/PRC-169](https://silvustechnologies.com/) making your PTT comms resistant to UDP jamming and interception. 

### SecurePTT keying

Note that this repository does not contain [keying environment](https://github.com/resiliencetheatre/rpi4ptt-init) and you need separately configure your network setup and nodes to support SecurePTT.

### Secure imagery storage

For [operations security](https://en.wikipedia.org/wiki/Operations_security) we can use optional Linux Unified Key Setup (LUKS) to encrypt data partition on same MicroSD card (or external USB drive).
Since we aim to use RPi4 in headless configuration we use [systemd-cryptsetup](https://www.freedesktop.org/software/systemd/man/latest/systemd-cryptsetup@.service.html)
with [FIDO2](https://shop.nitrokey.com/shop/product/nkfi2-nitrokey-fido2-55) key. With this approach we can start unit to fully operational state with FIDO2 key plugged in to USB port and after unit is booted (and LUKS partitions are opened) - we can remove FIDO2 key. 

Note that this secureptt branch is configured to use third partition for maps, elevation model and imagery without encryption. 

### Additional notes

This version does NOT have high rate target, simulations, CoT reading and [AN/PRC-169](https://silvustechnologies.com/) support. 

If you choose to use browser based geolocation, configure installation to use TLS connection. 


## Building

To build edgemap firmware, you need to install Buildroot environment and clone this repository 
as 'external tree' to buildroot. Make sure you check buildroot manual for required packages for your host, before building.

```
mkdir build-directory
cd build-directory/
git clone https://github.com/resiliencetheatre/rpi4edgemapdisplay.git
git clone https://git.buildroot.net/buildroot
cd buildroot/
nano package/rpi-firmware/rpi-firmware.mk 
rm package/rpi-firmware/rpi-firmware.hash 
export BR2_EXTERNAL=~/build-directory/rpi4edgemapdisplay
cd ~/build-directory
make rpi4_secureptt_6.6_defconfig
make
```

Current build tested with master branch of buildroot `06397d26a0cef5ddce0b04919acac8f4d63dacbf`.

Modify `rpi-firmware` package file and change firmware version tag to
match kernel version (6.6.51) we're using. 

```
# package/rpi-firmware/rpi-firmware.mk
RPI_FIRMWARE_VERSION = 6c7d1719966f459ab0349c8af32f0c774c696234
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

Make defconfig and start building:

```
cd ~/build-directory/buildroot
make rpi4_secureptt_6.6_defconfig
make
```

Note that there are few different configurations available:

|Config|Target|
|------|------|
|rpi4_secureptt_defconfig|Standard defconfig with USB headset support|
|rpi4_secureptt_6.1_defconfig|Codec Zero defconfig with SMC-34 monofone support|
|rpi4_secureptt_6.8_defconfig|Development config with Linux kernel 6.8|

After build is completed, you find image file for MicroSD card at:

```
~/build-directory/buildroot/output/images/sdcard.img
```

Use 'dd' to copy this image to your MicroSD card.

## Patching iqaudio driver

You can optionally patch iqaudio-codec.c driver to remove really anoying 
delay on audio opening. Download [this patch](https://gist.github.com/resiliencetheatre/9b9323e37b81a49a5724f68c04ac7dff) and place it under buildroot/linux/ before build.

## codec2 binaries

If you wish to have codec2 binaries on your edgemap device, use provided buildroot-extras/libcodec2.mk file
to have them copied to target on build. Replace original libcodec2.mk file in ~/build-directory/buildroot/package/libcodec2/ 
with provided ~/build-directory/rpi4edgemapdisplay/buildroot-extras/libcodec2.mk file.

# Configuration

By default meshtastic branch works without FIDO2 enabled encryption, use `create-partition-noenc.sh` script 
to partition remaining space on your MicroSD card.

Place pmtiles to your MicroSD second partition and link them under /opt/edgemap/edgeui/ 
on running instance. Modify also styles/style.json to match amount of sources available.

## Map data

You need to have full [planet OSM](https://maps.protomaps.com/builds/) pmtiles and A global terrain RGB dataset from [Mapzen Joerd](https://github.com/tilezen/joerd) project.

As full planet pmtiles file is HUGE (>100 GB) you can either copy it manually to card or use inbuilt wget to download it.

Preparing card 'maps' partition after first boot, you could enter following command:

```
# create-partition-noenc.sh
```

This will create third partition with EXT4 filesystem and label 'maps'. After create completes, reboot your RPi4 to automount partition on next boot.

After boot completes with and created 'maps' partition is usable, you can download pmtiles to card with:

```
# cd /opt/data
# wget --no-check-certificate https://build.protomaps.com/20240520.pmtiles -O planet.pmtiles
# sync
```

Note that downloading over 100 GB file might take several hours to complete, depending your connection speed.

## Meshtastic 

Configure USB serial port of your meshtastic radios:

```
# /opt/edgemap/meshpipe/meshtastic.env 
MESHTASTIC_PORT="/dev/ttyACM0"
```

* LilyGo: /dev/ttyUSB0
* Heltec: /dev/ttyACM0

## Reticulum configuration

You can find reticulum (rnsd) configuration file at:

```
/opt/meshchat/config
```

## Local GPS

This branch has [gpsd ](https://gpsd.io/) package which can read your locally attached GPS receiver(s) and expose location information to localhost socket. There is also [gpsreader](https://github.com/resiliencetheatre/gpsreader) as buildroot package and it's used to read gpsd socket and output location string to fifo file. This fifo is delivered to map UI via websocket. 

Locally connected GPS is good companion for Edgemap with Meshtastic radios. Typically browser based geolocation (also present in edgemap UI) requires TLS connection between EUD (client) and edgemap (server). Since TLS connection requires complex and meta data enriched certificates to be present and real time (difficult to obtain in battle space) we offer edgemap UI without TLS to local network connected EUD's. Browser geolocation requires also Cell, Wifi and BT to be active (stupidity in battle space) for optimum results.

You can configure GPS serial port:

```
# /etc/default/gpsd
DEVICES="/dev/ttyUSB1"
```

Daemon (gpsd) and 'gpsreader' is started automatically after you plug GPS in USB port.

