# Edgemap UI

This repository contains Edgemap user interface (edge-ui) for browser based mapping with [Protomaps](https://protomaps.com/).

EdgeUI is one php file user interface for [Edgemap](https://resilience-theatre.com/edgemap/) firmware image. Running on
[Raspberry Pi4](https://en.wikipedia.org/wiki/Raspberry_Pi). All maps are pmtiles handled by [maplibre-gl-js](https://github.com/maplibre/maplibre-gl-js) library.

## Usage

This demonstration user interface is simple example how browser based mapping can be implemented
with minimal dependencies. It's main funciton is to offer quick integration starting point to 
support development of sensory sources, mesh radios or highrate positioning sources. Please note
that this code is not product ready quality by any means.

## Infographic

![infographic](https://github.com/resiliencetheatre/edgemap-ui/blob/main/doc/edgemap-infograph.png?raw=true)

## User interface 

![userinterface](https://github.com/resiliencetheatre/edgemap-ui/blob/main/doc/edgemap-ui.png?raw=true)

## CONOPS

You can deploy edgemap to different operational situations:

![conops-1](https://github.com/resiliencetheatre/edgemap-ui/blob/main/doc/edgemap-conops-1.png?raw=true)

Deliver situational awareness across security domains:

![conops-2](https://github.com/resiliencetheatre/edgemap-ui/blob/main/doc/edgemap-conops-2.png?raw=true)

## Message routing

Messages between users gets delivered via websocket and underlying gwsocket program.
Locally run tacmsgrouter acts as placeholder to deliver messages in and out within
entity.

![routing](https://github.com/resiliencetheatre/edgemap-ui/blob/main/doc/edgemap-msg-routing.png?raw=true)

## Sensor marker message

You can use messaging channel to deliver sensors to map. 

```
[from]|sensorMarker|[LAT,LON]|[markedId],[markerStatus],[symbol code]
```

If "markerId" is something you've already created, symbol gets just
updated (lat,lon,marker status and symbol). So you can move, update status
and change symbol as needed. If you use 'delete' as marker status, it gets
removed from map.

Example sensorMarker messages for testing. You can paste following messages
to second instance messaging dialog. Note that when you paste sensor messages
to web UI messaging box - you don't need 'from' because it's automatically your
callsign on UI. 

```
# Ground track equipment, sensor:
sensorMarker|[58.9244991,24.4445800]|path12,track sensor,SFG-ES------
# Electronic Warfare
sensorMarker|[59.3555961,24.3511962]|path13,EW unit,SFG-UUMSE-
# Search center
sensorMarker|[58.9074826,23.5766601]|path14,Search,GFG-GPUSC-
# Point of interest:
sensorMarker|[58.6026105,23.2580566]|path15,POI-12,GFG-GPRI--
# Observation post:
sensorMarker|[58.3815585,24.1479492]|path16,Observation point,GFG-DPO---
# Unspecified mine:
sensorMarker|[58.3239145,25.4113769]|path17,Unspecified Mine,GFM-OMU---
# Sigint cellular:
sensorMarker|[59.3023560,27.1032714]|path18,SIGINT,IFG-SCC---
# Refugees:
sensorMarker|[58.9244991,22.6922607]|path19,Group of 10,OFI-R-----
# SOF unit
sensorMarker|[59.0292493,25.0488281]|path20,alive ping,SFF-------
# Remove sensor 
sensorMarker|[58.9244991,24.4445800]|path12,delete,SFG-ES------

# Demo simulation sensors
sensorMarker|[24.3377126,121.311721]|path12,Main gate,SFG-ES------
sensorMarker|[24.4412111,121.318244]|path13,EW unit,SFG-UUMSE-
sensorMarker|24.4887107,121.424674]|path14,Search,GFG-GPUSC-
sensorMarker|[24.6632423,121.737785]|path15,POI-12,GFG-GPRI--
sensorMarker|[24.9459077,121.329231]|path18,Sub 4 GHz,IFG-SCC---
sensorMarker|[24.6526338,121.589469]|path20,ReadyUnit,SFF-------

```

## Image marker message

Image marker message is generated after image upload has completed. When
image marker message is received with coordinates and filename, image gets
shown on map as green marker and popup containing image.

```
[from]|imageMarker|[LAT,LON]|[IMAGE_FILENAME]
```

Uploaded image filename contains following sections:

```
[TIMESTAMP]_[LAT]_[LON]_[FROM]_[FILENAME]
```

If image is uploaded without geolocation active, LAT and LON are '-'.

Even image marker message and filename are utilized togetgether on map
originated image upload, there is also use cases where you might want 
to present image markers on map just with image marker message. 

![image-upload](https://github.com/resiliencetheatre/edgemap-ui/blob/main/doc/edgemap-imageupload.png?raw=true)

Note that upload.php saves also thubnail version of image and this image
is used as marker popup preview. Clicking marker popup image will open
modal version of full scale image on top of the map. This url is stored
in alt property of image. 

## Highrate marker

Map defines one 'highrate' marker as demonstration how marker location can be updated
with higher speed via websocket. It can be utilizied for high velocity targets.

![highrate](https://github.com/resiliencetheatre/edgemap-ui/blob/main/doc/edgemap-highrate.png?raw=true)

## Geojson source

Map contains periodic geojson fetch functionality which allows you to illustrate several target
positions, link lines and signal streght indication between MESH radios or other sources. It utilizes
local sqlite database as an example and this database is inserted from Taky originated CoT messages
by curlcot program. This is pure example at this stage.

![geojson](https://github.com/resiliencetheatre/edgemap-ui/blob/main/doc/edgemap-geojson.png?raw=true)


## Versions

* [maplibre-gl v3.6.1](https://github.com/maplibre/maplibre-gl-js/releases)
* [protomaps v2.11.0](https://github.com/protomaps/PMTiles)
* [planet builds](https://maps.protomaps.com/builds/)
* [terrain data](https://protomaps.com/blog/serverless-maps-now-open-source)
* [terrain data attribution](https://github.com/tilezen/joerd/blob/master/docs/attribution.md)


