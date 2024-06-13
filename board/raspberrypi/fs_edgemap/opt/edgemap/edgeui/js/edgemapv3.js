/*
     _____    _                                  
    | ____|__| | __ _  ___ _ __ ___   __ _ _ __  
    |  _| / _` |/ _` |/ _ \ '_ ` _ \ / _` | '_ \ 
    | |__| (_| | (_| |  __/ | | | | | (_| | |_) |
    |_____\__,_|\__, |\___|_| |_| |_|\__,_| .__/ 
             |___/                     |_|   

    Simple Edgemap user interface for off the grid browser use
    Copyright (C) 2023 Resilience Theatre

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

    [1] https://www.spatialillusions.com/milsymbol/documentation.html
    [2] https://maplibre.org/maplibre-gl-js/docs/API/
    [3] https://protomaps.com/
 
*/
class peerList {
        constructor() {
            this.members = [];
            this.timestamps = [];
        }
        add(callsign, timeStamp) {            
            const index = this.members.findIndex(x => x === callsign);
            if (index !== -1) {
                // Update existing
                this.members[index] = callsign;
                this.timestamps[index] = timeStamp;
                return true;
            } else {
                // Add new
                this.members.push(callsign);  
                this.timestamps.push(timeStamp); 
                return true;
            }
            return false;
        }
        remove(callsign) {
            const index = this.members.findIndex(x => x === callsign);
            if (index !== -1) {
                this.members.splice(index, 1);
                this.timestamps.splice(index, 1);
                return true;
            }
            return false;
        }
        present(callsign) {
            const index = this.members.findIndex(x => x === callsign);
            if (index !== -1) {
                return true;
            }
            return false;
        }
        getSize() {
            return this.members.length;
        }
}

// Meshtastic radio list
class radioList {
        constructor() {
            this.members = [];
            this.timestamps = [];
            this.battery = [];
            this.airUtilTx = [];
            this.rxSnr = [];
            this.hopLimit = [];
            this.rxRssi = [];
        }
        add(callsign, timeStamp,DeviceBat,DeviceAirUtilTx,DeviceRxSnr,DeviceHopLimit,DeviceRxRssi) {            
            const index = this.members.findIndex(x => x === callsign);
            if (index !== -1) {
                // Update existing but don't over write existing 
                this.members[index] = callsign;
                this.timestamps[index] = timeStamp;
                if ( DeviceBat != "-" )
                    this.battery[index] = DeviceBat;
                if ( DeviceAirUtilTx != "-" )    
                    this.airUtilTx[index] = DeviceAirUtilTx;
                if ( DeviceRxSnr != "-" ) 
                    this.rxSnr[index] = DeviceRxSnr;
                if ( DeviceHopLimit != "-" ) 
                    this.hopLimit[index] = DeviceHopLimit;
                if ( DeviceRxRssi != "-" ) 
                    this.rxRssi[index] = DeviceRxRssi;
                return true;
            } else {
                // Add new
                this.members.push(callsign);  
                this.timestamps.push(timeStamp); 
                this.battery.push(DeviceBat); 
                this.airUtilTx.push(DeviceAirUtilTx); 
                this.rxSnr.push(DeviceRxSnr); 
                this.hopLimit.push(DeviceHopLimit); 
                this.rxRssi.push(DeviceRxRssi);
                return true;
            }
            return false;
        }
        // TODO: Not tested at all
        remove(callsign) {
            const index = this.members.findIndex(x => x === callsign);
            if (index !== -1) {
                this.members.splice(index, 1);
                this.timestamps.splice(index, 1);
                this.battery.splice(index, 1);
                this.airUtilTx.splice(index, 1);
                this.rxSnr.splice(index, 1);
                this.hopLimit.splice(index, 1);
                this.rxRssi.splice(index, 1);
                return true;
            }
            return false;
        }
        present(callsign) {
            const index = this.members.findIndex(x => x === callsign);
            if (index !== -1) {
                return true;
            }
            return false;
        }
        getSize() {
            return this.members.length;
        }
}


function updateRadioListBlock() {
    document.getElementById("radiolist").innerHTML = "";
    var radioLoop=0;
    var radioListContent = "";
    // List with hop limit
    // radioListContent = "<table width=90%><tr ><td style='border-bottom: 1px solid #0F0;' >Radio</td><td style='border-bottom: 1px solid #0F0;' >Bat</td><td style='border-bottom: 1px solid #0F0;'>Air Util</td><td style='border-bottom: 1px solid #0F0;' align='center'>Hop</td><td style='border-bottom: 1px solid #0F0;' align='center'>S/N</td><td style='border-bottom: 1px solid #0F0;' align='center'>RSSI</td><td style='border-bottom: 1px solid #0F0;' align='center'>Age</td></tr>";
    // List without hop limit
    radioListContent = "<table width=90%><tr ><td style='border-bottom: 1px solid #0F0;' >Radio</td><td style='border-bottom: 1px solid #0F0;' >Bat</td><td style='border-bottom: 1px solid #0F0;'>Air Util</td><td style='border-bottom: 1px solid #0F0;' align='center'>S/N</td><td style='border-bottom: 1px solid #0F0;' align='center'>RSSI</td><td style='border-bottom: 1px solid #0F0;' align='center' title='Age in minutes' >Age</td></tr>";
    for ( radioLoop = 0; radioLoop < radiosOnSystem.getSize(); radioLoop++) { 
        // Calculate age
        let currentTime = Math.round(+new Date()/1000);
        var ageInSeconds = parseInt ( currentTime ) - parseInt( radiosOnSystem.timestamps[radioLoop] );
        var age = Math.round(ageInSeconds/60);        
        if ( age > 60 ) {
            age = ">60";
        }
        // radioListContent += "<tr><td>" + radiosOnSystem.members[radioLoop] + "</td><td>" + radiosOnSystem.battery[radioLoop] + " %</td><td>" + radiosOnSystem.airUtilTx[radioLoop] + " %</td><td align='center'>" + radiosOnSystem.hopLimit[radioLoop] + "</td><td align='center'>" + radiosOnSystem.rxSnr[radioLoop] + "</td><td align='center'>" + radiosOnSystem.rxRssi[radioLoop] + "</td><td align='center'>" + age + "</td></tr>";
        radioListContent += "<tr><td>" + radiosOnSystem.members[radioLoop] + "</td><td>" + radiosOnSystem.battery[radioLoop] + " %</td><td>" + radiosOnSystem.airUtilTx[radioLoop] + " %</td><td align='center'>" + radiosOnSystem.rxSnr[radioLoop] + "</td><td align='center'>" + radiosOnSystem.rxRssi[radioLoop] + "</td><td align='center'>" + age + "</td></tr>";
    }
    radioListContent += "</table>";
    document.getElementById("radiolist").innerHTML = radioListContent;
}

// TODO: add openJanus() and janus destroy
function toggleVideoConference() {
    const elementOpacity=0.8;
    if( typeof toggleVideoConference.videoListVisible == 'undefined' ) {
        fadeInTo09(videoConferenceDiv ,400,elementOpacity);
        toggleVideoConference.videoListVisible = true;
        openJanus();
        return;
    }
    if ( toggleVideoConference.videoListVisible == true ) {
        fadeOutFrom09(videoConferenceDiv ,400,elementOpacity);
        toggleVideoConference.videoListVisible = false;
        closeJanus();
        return;
    }
    if ( toggleVideoConference.videoListVisible == false ) {
        fadeInTo09(videoConferenceDiv ,400,elementOpacity);
        toggleVideoConference.videoListVisible = true;
        openJanus();
        return;
    }    
}

function toggleUserList() {
    const elementOpacity=0.8;
    if( typeof toggleUserList.userListVisible == 'undefined' ) {
        fadeInTo09(peerlistblockDiv ,400,elementOpacity);
        toggleUserList.userListVisible = true;
        return;
    }
    if ( toggleUserList.userListVisible == true ) {
        fadeOutFrom09(peerlistblockDiv ,400,elementOpacity);
        toggleUserList.userListVisible = false;
        return;
    }
    if ( toggleUserList.userListVisible == false ) {
        fadeInTo09(peerlistblockDiv ,400,elementOpacity);
        toggleUserList.userListVisible = true;
        return;
    }    
}

function toggleRadioList() {
    const elementOpacity=0.8;
    if( typeof toggleRadioList.radioListVisible == 'undefined' ) {
        fadeInTo09(radiolistblockDiv ,400,elementOpacity);
        toggleRadioList.radioListVisible = true;
        fadeOut(radioNotifyDotDiv,200);
        return;
    }
    if ( toggleRadioList.radioListVisible == true ) {
        fadeOutFrom09(radiolistblockDiv ,400,elementOpacity);
        toggleRadioList.radioListVisible = false;
        return;
    }
    if ( toggleRadioList.radioListVisible == false ) {
        fadeInTo09(radiolistblockDiv ,400,elementOpacity);
        toggleRadioList.radioListVisible = true;
        fadeOut(radioNotifyDotDiv,200);
        return;
    }    
}

function sendMessage(messagepayload) {
    if ( msgSocketConnected ) {
        msgSocket.send( messagepayload );
    }
}

function updatePeerListBlock() {
    document.getElementById("peerlist").innerHTML = "";
    var peerLoop=0;
    var peerListContent = "";
    for ( peerLoop = 0; peerLoop < peersOnMap.getSize(); peerLoop++) {
        peerListContent += peersOnMap.members[peerLoop];
        peerListContent += "<br>";
    }
    document.getElementById("peerlist").innerHTML = peerListContent;
}






// Remove peers if unheard over 30 s
function checkPeerExpiry() {
    let currentTime = Math.round(+new Date()/1000);
    for ( peerLoop = 0; peerLoop < peersOnMap.getSize(); peerLoop++) {
        var peerAge = parseInt ( currentTime ) - parseInt( peersOnMap.timestamps[peerLoop] );
        if ( peerAge > 30 ) {
            peersOnMap.remove( peersOnMap.members[peerLoop] );
            updatePeerListBlock(); 
        }
    }
}

// Remove radios if unheard over 300 s
function checkRadioExpiry() {
    let currentTime = Math.round(+new Date()/1000);
    for ( radioLoop = 0; radioLoop < radiosOnSystem.getSize(); radioLoop++) {
        var radioAge = parseInt ( currentTime ) - parseInt( radiosOnSystem.timestamps[peerLoop] );
        if ( radioAge > 300 ) {
            radiosOnSystem.remove( radiosOnSystem.members[peerLoop] );
            updateRadioListBlock(); 
        }
    }
}


function notifyMessage(message, timeout) {
     fadeIn(document.getElementById("bottomLog") ,400);
        document.getElementById("notifyMessage").innerHTML = message;
        setTimeout(() => {
            fadeOut(document.getElementById("bottomLog") ,1000);
        }, timeout);
}

// 
// Replace window.location.reload(); on page reload
// 
function reloadPage() {
    window.location=window.location;
}

// If you enable geolocate, post contains also lat,lon and callsign
// They are updated from geolocate callback at map.php 
function submitImage() {
    // Submit to upload.php
    uploadform.submit();
    // Capture what upload.php outputs to 'dummyframe' (filename) and use location
    // (if available) and callsign. So we have everything at hand to form "new image" 
    // message to other peers.
    iframeContentChange(document.getElementById("dummyframe"), function (payload) {
       if ( payload != "" ) {
            var notifyMessagePayload="Image sent";
            if ( lastKnownCoordinates ) {
            notifyMessagePayload = notifyMessagePayload + " with location";
            // Send imageMarker if we have location available
            var imgMsg = callSign + `|imageMarker|[`+lastKnownCoordinates.latitude+`,`+lastKnownCoordinates.longitude+`]|`+ payload + '\n';
            msgSocket.send( imgMsg );
            }
            notifyMessage(notifyMessagePayload, 5000);
       }
    });
    
}

// Monitoring dummyframe content change, based on:
// https://gist.github.com/hdodov/a87c097216718655ead6cf2969b0dcfa
function iframeContentChange(iframe, callback) {
    var lastDispatched = null;
    var dispatchChange = function () {
        if ( iframe.contentWindow.document.body !== null ) {
            var newContent = iframe.contentWindow.document.body.innerHTML;
            if (newContent !== lastDispatched) {
                callback(newContent);
                lastDispatched = newContent;
                iframe.contentWindow.document.body.innerHTML="";
            }
        }
    };
    var unloadHandler = function () {
        // Timeout needed because the URL changes immediately after
        // the `unload` event is dispatched.
        setTimeout(dispatchChange, 0);
    };
    function attachUnload() {
        // Remove the unloadHandler in case it was already attached.
        // Otherwise, there will be two handlers, which is unnecessary.
        iframe.contentWindow.removeEventListener("unload", unloadHandler);
        iframe.contentWindow.addEventListener("unload", unloadHandler);
    }
    iframe.addEventListener("load", function () {
        attachUnload();
        // Just in case the change wasn't dispatched during the unload event...
        dispatchChange();
    });
    attachUnload();
}

//
// Image markers
// 
// upload.php creates two files:
// '1700964684_-_-_HAME-21_Screenshot from 2023-11-25 07-58-21.png'
// '1700964684_-_-_HAME-21_Screenshot from 2023-11-25 07-58-21_thumb.png'
// 
function createImageMarker(from,lat,lon,filename) {
        var markerId=filename;
        
        // Display thumbnail and add modal class and id
        // markerStatus contains img src (thumbnail) and img alt (full size)
        var filename_without_extension=filename.slice(0, -4); 
        var filename_extension=filename.slice(-4); // .png
        var filename_thumb=filename_without_extension+"_thumb"+filename_extension;        
        var markerStatus = "<img class='myImages' id='myImg' src='../uploads/" + filename_thumb + "' alt='../uploads/" + filename+ "' width=100px;>";
        
        if ( !imageMarker[markerId] ) {
            var ll = new maplibregl.LngLat(lon, lat);	
            imageMarkerPopup[markerId] = new maplibregl.Popup({ offset: 25, closeOnClick: false,  }).setHTML(markerStatus);
            imageMarker[markerId] = new maplibregl.Marker({
                color: "#2EAA2E",
                draggable: false
                })
                .setLngLat( ll )
                .setPopup(imageMarkerPopup[markerId])
                .addTo(map);
            imageMarker[markerId].togglePopup();
        }
        // If marker is already created with 'markerId' - update location + markerStatus + symbol
        // NOTE: This is not in use
        if ( imageMarker[markerId] ) {
            var ll = new maplibregl.LngLat(lon, lat);
            imageMarker[markerId].remove();
            // Create marker DOM
            imageMarker[markerId] = new maplibregl.Marker({
                color: "#2EAA2E",
                draggable: false
                })
                .setLngLat( ll )
                .setPopup(imageMarkerPopup[markerId])
                .addTo(map);
            imageMarkerPopup[markerId].setHTML(markerStatus);
            if ( !imageMarkerPopup[markerId].isOpen() ) {
                imageMarker[markerId].togglePopup();
            }
        }
}

//
// Sensor markers
//
function createSensorMarker(lat,lon,markerId,markerStatus,sensorSymbol) {
    
    if ( sensorMarker[markerId] && markerStatus == "delete" ) {
        sensorMarker[markerId].remove();
    } else {
    
        if ( !sensorMarker[markerId] ) {
            var ll = new maplibregl.LngLat(lon, lat);	
            sensorMarkerPopup[markerId] = new maplibregl.Popup({ offset: 25, closeOnClick: false,  }).setHTML(markerStatus);
            const sensoreMarkerGraph = new ms.Symbol(sensorSymbol, { size:30 });
            var sensoreMarkerGraphDom = sensoreMarkerGraph.asDOM();
            // Use milsymbol as marker
            sensorMarker[markerId] = new maplibregl.Marker({
                color: "#2EAA2E",
                element: sensoreMarkerGraphDom,
                draggable: false
                })
                .setLngLat( ll )
                .setPopup(sensorMarkerPopup[markerId])
                .addTo(map);
            sensorMarker[markerId].togglePopup();
        }
        // If marker is already created with 'markerId' - update location + markerStatus + symbol
        if ( sensorMarker[markerId] ) {
            var ll = new maplibregl.LngLat(lon, lat);
            sensorMarker[markerId].remove();
            // Create marker DOM
            const sensoreMarkerGraph = new ms.Symbol(sensorSymbol, { size:30 });
            var sensoreMarkerGraphDom = sensoreMarkerGraph.asDOM();
            sensorMarker[markerId] = new maplibregl.Marker({
                color: "#2EAA2E",
                element: sensoreMarkerGraphDom,
                draggable: false
                })
                .setLngLat( ll )
                .setPopup(sensorMarkerPopup[markerId])
                .addTo(map);
            sensorMarkerPopup[markerId].setHTML(markerStatus);
            if ( !sensorMarkerPopup[markerId].isOpen() ) {
                sensorMarker[markerId].togglePopup();
            }
        }
    }
}

//
// Marker from geolocation
//
function createTrackMarkerFromMessage(lon, lat, msgFrom, msgMessage) {

    if ( !trackMessageMarkers[msgFrom] ) {        
        notifyMessage("Creating marker for: " + msgFrom, 5000);
        trackMessageMarkerGraph.setOptions({ type: msgFrom });
        trackMessageMarkerGraphDom = trackMessageMarkerGraph.asDOM();
        var ll = new maplibregl.LngLat(lon, lat);
        trackMessageMarkers[msgFrom] = new maplibregl.Marker({
		element: trackMessageMarkerGraphDom,
		draggable: false
		})
		.setLngLat( ll )
		.addTo(map);
    }
    
    // Update location of already created markers 
    if ( trackMessageMarkers[msgFrom] ) {
        
         if ( msgMessage.includes("Stopped") ) {
            notifyMessage("Tracking stopped: " + msgFrom, 5000);
        }
        trackMessageMarkers[msgFrom].remove();
        // Get time
        var date = new Date();        
        var hours;
        var minutes;
        var seconds;
        if ( date.getHours() < 10 ) {
            hours = "0" + date.getHours();
        } else {
            hours = date.getHours();
        }
        if ( date.getMinutes() < 10 ) {
            minutes = "0" + date.getMinutes();
        } else {
            minutes = date.getMinutes();
        }
         if ( date.getSeconds() < 10 ) {
            seconds = "0" + date.getSeconds();
        } else {
            seconds = date.getSeconds();
        }
        var timeStamp = hours + ":" + minutes + ":"+ seconds;
        // Update marker options
        trackMessageMarkerGraph.setOptions({ staffComments: timeStamp  });
        trackMessageMarkerGraph.setOptions({ additionalInformation: msgMessage  });
        trackMessageMarkerGraph.setOptions({ type: msgFrom });
        trackMessageMarkerGraphDom = trackMessageMarkerGraph.asDOM();
        // Get new position
        var ll = new maplibregl.LngLat(lon, lat);
        // Add marker to map
        trackMessageMarkers[msgFrom] = new maplibregl.Marker({
            element: trackMessageMarkerGraphDom,
            draggable: false
            })
            .setLngLat( ll )
            .addTo(map);
    }  
}

//
// Create marker from incoming Message
//
function createMarkerFromMessage(index, lon, lat, markerText) {
	var ll = new maplibregl.LngLat(lon, lat);	
	// create the popup
	mapPinMarkerPopup[index] = new maplibregl.Popup({ offset: 35, closeOnClick: false,  }).setHTML(markerText);
	// create DOM element for the marker TODO: Array?
	var el = document.createElement('div');
	el.id = 'marker';
	mapPinMarker[index] = new maplibregl.Marker({
		color: "#FF515E",
		draggable: false
		})
		.setLngLat( ll )
		.setPopup(mapPinMarkerPopup[index])
		.addTo(map);
	mapPinMarker[index].togglePopup();
}

//
// Create new dragable marker and push it to array for later use
//
function newDragableMarker() {
	var newPopup = new maplibregl.Popup({ offset: 35, closeOnClick: false, }).setText('popup'+ Date.now());		
	var markerD = new maplibregl.Marker({
		draggable: 'true',
		id: 'c1'
	})
	.setLngLat( map.getCenter().toArray() )
	.setPopup(newPopup)
	.addTo(map);
	markerD._element.id = "dM-" + Date.now();
	// inline dragend function
	markerD.on('dragend', () => {
        msgInput.value = "";
		var lngLat = markerD.getLngLat();
		var msgLatValue = String(lngLat.lat);
		var msgLonValue = String(lngLat.lng);	
		var templateValue = 'dropMarker|[' + msgLonValue.substr(0,8) + ',' + msgLatValue.substr(0,8) + ']|';
		msgInput.value = templateValue;
        document.getElementById("msgInput").focus();
		markerD.setPopup(new maplibregl.Popup().setHTML(templateValue)); // probably not needed
		lastDraggedMarkerId = markerD._element.id;
	});
	dragMarkers.push(markerD);
	dragPopups.push(newPopup);
}

function addPopupToMarker(popupText) {
	mapPinMarkerPopup.setText( popupText );
}

function eraseMsgLog() {
	document.getElementById('msgChannelLog').innerHTML = ""; 
}

function parse_query_string(query) {
  var vars = query.split("&");
  var query_string = {};
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    var key = decodeURIComponent(pair.shift());
    var value = decodeURIComponent(pair.join("="));
    // If first entry with this name
    if (typeof query_string[key] === "undefined") {
      query_string[key] = value;
      // If second entry with this name
    } else if (typeof query_string[key] === "string") {
      var arr = [query_string[key], value];
      query_string[key] = arr;
      // If third or later entry with this name
    } else {
      query_string[key].push(value);
    }
  }
  return query_string;
}

// Local GPS marker animation
function animateLocalGpsMarker(timestamp) {		
    localGpsMarker.remove();
    var lat = document.getElementById('lat_localgps').innerHTML;
    var lon = document.getElementById('lon_localgps').innerHTML; 
    var mode = document.getElementById('mode_localgps').innerHTML;
    var speed = document.getElementById('speed_localgps').innerHTML;
    var localGpsName = "Local GPS"; 
    var locationComment = speed + " km/h";
    milSymbolLocalGps.setOptions({ staffComments: locationComment });
    milSymbolLocalGps.setOptions({ commonIdentifier: "" });
    milSymbolLocalGps.setOptions({ type: localGpsName });
    milSymbolLocalGpsMarker = milSymbolLocalGps.asDOM(); 
    localGpsMarker = new maplibregl.Marker({
            element: milSymbolLocalGpsMarker
        });
    localGpsMarker.setLngLat([lat,lon]);
    localGpsMarker.addTo(map);
    requestAnimationFrame(animateLocalGpsMarker);
} 

// Send my GPS provided location over meshtastic msg channel when
// coordinates are clicked on top bar. 
function sendMyGpsLocation() {
    var lat = document.getElementById('lat_localgps').innerHTML;
    var lon = document.getElementById('lon_localgps').innerHTML; 
    sendMessage ( callSign + `|trackMarker|` + lat + `,` + lon + `|GPS-snapshot` + '\n' );
    notifyMessage("Local GPS position sent as track marker", 5000);
}

//
// Highrate marker animation
//
function animateHighrateMarker(timestamp) {		
        // Experimental version
        if ( 1 ) {
            highrateMarker.remove();
            var lat = document.getElementById('lat_highrate').innerHTML;
            var lon = document.getElementById('lon_highrate').innerHTML; 
            var highrateName = document.getElementById('name_highrate').innerHTML;
            var locationComment = lat + "," + lon;
            milSymbolHighrate.setOptions({ staffComments: locationComment });
            milSymbolHighrate.setOptions({ type: highrateName });
            
            milSymHighrateMarker = milSymbolHighrate.asDOM(); 
            highrateMarker = new maplibregl.Marker({
                    element: milSymHighrateMarker
				});
            highrateMarker.setLngLat([lat,lon]);
            highrateMarker.addTo(map);
            requestAnimationFrame(animateHighrateMarker);
        }
        // Working stable:
        if( 0 ) {
            var lat = document.getElementById('lat_highrate').innerHTML;
            var lon = document.getElementById('lon_highrate').innerHTML; 
            highrateMarker.setLngLat([lat,lon]);
            // Ensure it's added to the map. This is safe to call if it's already added.
            highrateMarker.addTo(map);
            // Request the next frame of the animation. ,
            requestAnimationFrame(animateHighrateMarker);
        }
} 

// CoT target tail toggle
function toggleTail() {
	if (map.getLayer('route')) {
		hideTails();
	} else {
		showTails();
	}
}
// Add 'route' layer for LineString geojson display. 
// NOTE: Layer is added before 'drone' layer. 
// https://jsfiddle.net/brianssheldon/wm18a33d/27/
function showTails() {
	if (!map.getLayer('route')) {
		/* line string layer */
		map.addLayer({
		'id': 'route',
		'type': 'line',
		'source': 'drone',
		'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color':  ['get', 'color'],
            'line-width': ['get', 'width'],
            'line-opacity': ['get', 'opacity']
            
		},
		'filter': ['==', '$type', 'LineString']
		},'drone');
        
        // Test labeling link lines with data from geojson
          map.addLayer({
            "id": "symbols",
            "type": "symbol",
            "source": "drone",
            "layout": {
              "symbol-placement": "line",
              "text-font": ["Open Sans Regular"],
              "text-field":  ['get', 'title'], 
              "text-size": ['get', 'text-size']
            },
            paint: {
              "text-color": ['get', 'text-color'],
              "text-halo-color":  ['get', 'text-halo-color'],
              "text-halo-width":  ['get', 'text-halo-width'],
              "text-halo-blur":  ['get', 'text-halo-blur']
            },
            filter: ['==', '$type', 'LineString']
          });
	}
}

function hideTails() {
	if (map.getLayer('route')) map.removeLayer('route'); 
}

// Options to change map style on fly.
// NOTE: Not in use, since style change loses symbols
function setDarkStyle() {
	map.setStyle(style_FI_debug);
}
function setNormalStyle() {
	map.setStyle(style_FI);
}

function centerMap(lat,lon) {
    map.flyTo({
        // These options control the ending camera position: centered at
        // the target, at zoom level 9, and north up.
        center: [lat,lon],
        zoom: 15,
        bearing: 0,
        // These options control the flight curve, making it move
        // slowly and zoom out almost completely before starting
        // to pan.
        speed: 0.8, // make the flying slow
        curve: 1,   // change the speed at which it zooms out

        // This can be any easing function: it takes a number between
        // 0 and 1 and returns another number between 0 and 1.
        easing (t) {
            return t;
        },
        // this animation is considered essential with respect to prefers-reduced-motion
        essential: true
    });
}

function zoomIn() {
	currentZoom = document.getElementById('zoomlevel').innerHTML;
	if ( currentZoom < 17 ) {
		currentZoom++;
		map.setZoom(currentZoom);
		document.getElementById('zoomlevel').innerHTML = currentZoom;
	}
}
function zoomOut() {
	currentZoom = document.getElementById('zoomlevel').innerHTML;
	if ( currentZoom > 1 ) {
		currentZoom--;
		map.setZoom(currentZoom);
		document.getElementById('zoomlevel').innerHTML = currentZoom;
	}
}

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};

// Support function to check video server presense on network
// TODO: hard coded IP of ZM instance still present
function checkVideoServer(cb){
	var img = new Image();
	img.onerror = function() {
		cb(false)
	}
	img.onload = function() {
		cb(true)
	}
	// Use fixed ZM image element as test point
	img.src = "http://192.168.5.97/zm/graphics/spinner.png?t=" + (+new Date);
}
function videoPanelsVisible(videoAvail) {
	var x = document.getElementById("leftVideo");
	var y = document.getElementById("rightVideo");
	if ( videoAvail == true ) {
		x.style.display = "";
		y.style.display = "";
	} else {
		x.style.display = "none";
		y.style.display = "none";
		// Instead of just hide, we can also stop streams (for bw reasons)
		// Note that resume needs page reload.
		document.getElementById("cam1").src="";
		document.getElementById("cam2").src="";
		document.getElementById("cam3").src="";
		document.getElementById("cam4").src="";
		document.getElementById("cam5").src="";
		document.getElementById("cam6").src="";
		document.getElementById("cam7").src="";
		document.getElementById("cam8").src="";
		document.getElementById("cam9").src="";
		document.getElementById("cam10").src="";
	}
}

// 
// This will update image based on JSON parsing every 2 s 
// Only dynamic field is dtg: sTimeStamp
// 
// NOTE: 
// * We have ageSeconds - but needs to illustrate it still
// * Simulation targets do not provide time
//
function updateImage(sName, sTimeStamp, ageSeconds) {
    // SFGAUCR-----	Anticipated
	// SFGPUCR----- Present
	// SFGCUCR----- Fully capable
	// SFGDUCR----- Damaged
    if ( ageSeconds < 60 ) {
		symbolCode = "SFGCUCR-----"; 
	} else {
		symbolCode = "SFGDUCR-----";
	}
	// NOTE: This is override for simulation    
    // symbolCode = "SFGPUCR-----";
	var updatedSym = new ms.Symbol(symbolCode, { size:20,
		dtg: "",
		staffComments: "".toUpperCase(),
		additionalInformation: "".toUpperCase(),
		combatEffectiveness: "".toUpperCase(),
		type: "",
		padding: 5
	});
	var updateCanvasElement = updatedSym.asCanvas();
	var updateSymoffset = 0 - updatedSym.getAnchor().x;				
	var updatedImg = new Image();
	updatedImg.src = updateCanvasElement.toDataURL();
	if ( map.hasImage( sName ) ) {
        // Update would be better, but size change
        // map.updateImage( sName, updatedImg );
        map.removeImage( sName );
        map.addImage( sName, updatedImg );
	}
}	


// Create image function, creates image element initially. 
// TODO: Size mismatch is an issue still.  symbolSize
function createImage(sName) {
    var updatedSym = new ms.Symbol("SFGPUCR-----", { size:20,
        dtg: "",
        staffComments: "".toUpperCase(),
        additionalInformation: "".toUpperCase(),
        combatEffectiveness: "READY".toUpperCase(),
        type: "",
        padding: 5
	});
	var updateCanvasElement = updatedSym.asCanvas();
    // TODO: On first call, we get this
    // "Uncaught DOMException: Index or size is negative or greater than the allowed amount"
    // Is this firefox issue?
    var updatedImg = new Image();
	updatedImg.src = updateCanvasElement.toDataURL();
    map.addImage(sName,updatedImg );
}

function getCoordinatesToClipboard() {
	var copyText = document.getElementById('lat').innerHTML + "," + document.getElementById('lon').innerHTML;
	copyToClipboard(copyText);
    fadeIn( document.getElementById("copyStatusIcon"), 0 );
    fadeOut( document.getElementById("copyStatusIcon"), 1400 );
} 

function changeLanguage(language) {
    /* Complete this property list */
    map.setLayoutProperty('places_country', 'text-field', ['get',`name:${language}` ]);
    map.setLayoutProperty('places_subplace', 'text-field', ['get',`name:${language}` ]);
    map.setLayoutProperty('places_locality', 'text-field', ['get',`name:${language}` ]);
    map.setLayoutProperty('places_region', 'text-field', ['get',`name:${language}` ]);    
    map.setLayoutProperty('roads_labels_minor', 'text-field', ['get',`name:${language}` ]);
    map.setLayoutProperty('roads_labels_major', 'text-field', ['get',`name:${language}` ]);
    closeLanguageSelectBox();
}

//
// Example from maplibre-gl pulsedot
//
function addDot(lon,lat) {
    const size = 100;
    const pulsingDot = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),

        // get rendering context for the map canvas when layer is added to the map
        onAdd () {
            const canvas = document.createElement('canvas');
            canvas.width = this.width;
            canvas.height = this.height;
            this.context = canvas.getContext('2d');
        },
        // called once before every frame where the icon will be used
        render () {
            const duration = 1000;
            const t = (performance.now() % duration) / duration;
            const radius = (size / 2) * 0.3;
            const outerRadius = (size / 2) * 0.7 * t + radius;
            const context = this.context;
            // draw outer circle
            context.clearRect(0, 0, this.width, this.height);
            context.beginPath();
            context.arc(
                this.width / 2,
                this.height / 2,
                outerRadius,
                0,
                Math.PI * 2
            );
            context.fillStyle = `rgba(255, 200, 200,${1 - t})`;
            context.fill();
            // draw inner circle
            context.beginPath();
            context.arc(
                this.width / 2,
                this.height / 2,
                radius,
                0,
                Math.PI * 2
            );
            context.fillStyle = 'rgba(255, 100, 100, 1)';
            context.strokeStyle = 'white';
            context.lineWidth = 2 + 4 * (1 - t);
            context.fill();
            context.stroke();
            // update this image's data with data from the canvas
            this.data = context.getImageData(
                0,
                0,
                this.width,
                this.height
            ).data;
            // continuously repaint the map, resulting in the smooth animation of the dot
            map.triggerRepaint();
            // return `true` to let the map know that the image was updated
            return true;
        }
    };
    // 
    map.addImage('pulsing-dot', pulsingDot, {pixelRatio: 2});
    map.addSource('pulsingpoints', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [lon,lat]
                    }
                }
            ]
        }
    });
    map.addLayer({
        'id': 'pulsepointslayer',
        'type': 'symbol',
        'source': 'pulsingpoints',
        'layout': {
            'icon-image': 'pulsing-dot'
        }
    });
}

function removeDot() {
    if (map.getImage("pulsing-dot")) {
        map.removeImage('pulsing-dot');
    }
    if (map.getLayer("pulsepointslayer")) {
        map.removeLayer('pulsepointslayer');
    }
    if (map.getSource("pulsingpoints")) {
        map.removeSource('pulsingpoints');
    }
}

// Nice example from stackoverflow how to capture coordinates on click to clipboard
// [1] https://stackoverflow.com/questions/51805395/navigator-clipboard-is-undefined
function copyToClipboard(textToCopy) {
	// navigator clipboard api needs a secure context (https)
	if (navigator.clipboard && window.isSecureContext) {
		// navigator clipboard api method'
		return navigator.clipboard.writeText(textToCopy);
	} else {
		// text area method
		let textArea = document.createElement("textarea");
		textArea.value = textToCopy;
		// make the textarea out of viewport
		textArea.style.position = "fixed";
		textArea.style.left = "-999999px";
		textArea.style.top = "-999999px";
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();
		return new Promise((res, rej) => {
			// here the magic happens
			document.execCommand('copy') ? res() : rej();
			textArea.remove();
		});
	}
}

//
// Generate random callsign for demo
//
function genCallSign() {
	var	min=0;
	var max=11;
	var nummin=10
	var nummax=50
	const csItems = ["ASTRA","BLACK","GOOFY","HAME","KAYA","SHOG","TIGER","VAN","WOLF","GOAT","IRON","NOMAD"];
	var csIndex = Math.floor(Math.random() * (max - min + 1) ) + min;
	var numValue = Math.floor(Math.random() * (nummax - nummin + 1) ) + nummin;
	var callSign=csItems[csIndex] + "-" + numValue;
	return callSign; 
}

//
// Dialog functions
//
function openLanguageSelectBox() {
    console.log("opening language");
    fadeIn(languageSelectDialogDiv,100);
    console.log("opening language 2");
}
function closeLanguageSelectBox() {
    fadeOut(languageSelectDialogDiv,100);
}
function openCoordinateSearchEntryBox() {
    document.getElementById('coordinateInput').value="";
    fadeIn(coordinateEntryBoxDiv,100);
    document.getElementById("coordinateInput").focus();
}
function closeCoordinateSearchEntryBox() {
    fadeOut(coordinateEntryBoxDiv,100);
}
function openCallSignEntryBox() {
    fadeIn(callSignEntryBoxDiv,200);
}

function closeCallSignEntryBox() {
    fadeOut(callSignEntryBoxDiv,200);
    var newCallSign=document.getElementById('myCallSign').value; 
    document.getElementById('myCallSign').value = newCallSign;
    document.getElementById('callSignDisplay').innerHTML = newCallSign;
    
    // Save changes to "/opt/edgemap-persist/callsign.txt"
    fetch('save_callsign.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: newCallSign })
    })
    .then(response => response.text())
    .then(data => {
        console.log('Data saved:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    
    
}

function openRadioList() {
    if ( logDiv.style.display == "" || logDiv.style.display !== "inline-block"  ) {
        if ( radiolistblockDiv.style.display !== "inline-block" ) {
            fadeIn(radiolistblockDiv ,200);
            fadeOut(radioNotifyDotDiv,200);
        }
    }
}

function closeRadioList() {
    if (logDiv.style.display !== "inline-block" ) {
        fadeOut(radiolistblockDiv ,200);
    }
}

function openMessageEntryBox() {
    const canVibrate = window.navigator.vibrate
    if (canVibrate) window.navigator.vibrate(100)
    if ( logDiv.style.display == "" || logDiv.style.display == "none" )
    {
        const canVibrate = window.navigator.vibrate
        if (canVibrate) window.navigator.vibrate([200, 100, 200]);
        fadeIn(logDiv,200);
        fadeOut(zoomDiv,200);
        fadeOut(sensorDiv,200);
        fadeOut(bottomBarDiv,200);
        fadeOut(cameracontrol,200);
        fadeOut(userlistbuttonDiv ,200);
        fadeOut(radiolistbuttonDiv ,200);
        fadeOut(radiolistblockDiv ,200);
        fadeOut(videoconferenceButton ,200);
         
    }
    document.getElementById("msgInput").focus();
}
function closeMessageEntryBox() {
    if ( logDiv.style.display == "" )
    {
      fadeIn(logDiv,200);
      fadeOut(zoomDiv,200);
      fadeOut(sensorDiv,200);
      fadeOut(cameracontrol,200);
      fadeOut(userlistbuttonDiv ,200);
      fadeOut(videoconferenceButton ,200);
    } else {
      if (logDiv.style.display !== "none" ) {      
        fadeOut(logDiv,200);
        fadeIn(zoomDiv,200);
        fadeIn(sensorDiv,200);
        fadeIn(bottomBarDiv,200);
        fadeIn(cameracontrol,200);
        fadeIn(userlistbuttonDiv ,200);
        fadeIn(radiolistbuttonDiv ,200);
        fadeIn(videoconferenceButton ,200);
        
      } else {
        fadeIn(logDiv,200);
        fadeOut(zoomDiv,200);
        fadeOut(sensorDiv,200);
        fadeOut(cameracontrol,200);
        fadeOut(userlistbuttonDiv,200);
        fadeOut(radiolistbuttonDiv ,200);
        fadeOut(radiolistblockDiv ,200);
        fadeOut(videoconferenceButton ,200);
      }
    }
}

var scrolling = function(e, c) {
  e.scrollIntoView();
  if (c < 5) setTimeout(scrolling, 300, e, c + 1);
};
var ensureVisible = function(e) {
  setTimeout(scrolling, 300, e, 0);
};


// fade in/out experiment
function fadeInTo09( elem, ms,opacityTarget )
{
  if( ! elem )
    return;
  elem.style.opacity = 0;
  elem.style.filter = "alpha(opacity=0)";
  elem.style.display = "inline-block";
  elem.style.visibility = "visible";

  if( ms )
  {
    var opacity = 0;
    var timer = setInterval( function() {
      opacity += 50 / ms;
      if( opacity >= opacityTarget )
      {
        clearInterval(timer);
        opacity = opacityTarget;
      }
      elem.style.opacity = opacity;
      elem.style.filter = "alpha(opacity=" + opacity * 100 + ")";
    }, 50 );
  }
  else
  {
    elem.style.opacity = opacityTarget;
    elem.style.filter = "alpha(opacity=0.9)";
  }
}

function fadeOutFrom09( elem, ms,opacityTarget )
{
  if( ! elem )
    return;

  if( ms )
  {
    var opacity = opacityTarget;
    var timer = setInterval( function() {
      opacity -= 50 / ms;
      if( opacity <= 0 )
      {
        clearInterval(timer);
        opacity = 0;
        elem.style.display = "none";
        elem.style.visibility = "hidden";
      }
      elem.style.opacity = opacity;
      elem.style.filter = "alpha(opacity=" + opacity * 100 + ")";
    }, 50 );
  }
  else
  {
    elem.style.opacity = 0;
    elem.style.filter = "alpha(opacity=0)";
    elem.style.display = "none";
    elem.style.visibility = "hidden";
  }
}

// fade in/out experiment
function fadeIn( elem, ms )
{
  if( ! elem )
    return;

  elem.style.opacity = 0;
  elem.style.filter = "alpha(opacity=0)";
  elem.style.display = "inline-block";
  elem.style.visibility = "visible";

  if( ms )
  {
    var opacity = 0;
    var timer = setInterval( function() {
      opacity += 50 / ms;
      if( opacity >= 1 )
      {
        clearInterval(timer);
        opacity = 1;
      }
      elem.style.opacity = opacity;
      elem.style.filter = "alpha(opacity=" + opacity * 100 + ")";
    }, 50 );
  }
  else
  {
    elem.style.opacity = 1;
    elem.style.filter = "alpha(opacity=1)";
  }
}

function fadeOut( elem, ms )
{
  if( ! elem )
    return;

  if( ms )
  {
    var opacity = 1;
    var timer = setInterval( function() {
      opacity -= 50 / ms;
      if( opacity <= 0 )
      {
        clearInterval(timer);
        opacity = 0;
        elem.style.display = "none";
        elem.style.visibility = "hidden";
      }
      elem.style.opacity = opacity;
      elem.style.filter = "alpha(opacity=" + opacity * 100 + ")";
    }, 50 );
  }
  else
  {
    elem.style.opacity = 0;
    elem.style.filter = "alpha(opacity=0)";
    elem.style.display = "none";
    elem.style.visibility = "hidden";
  }
}

function isHidden(el) {
    return (el.offsetParent === null)
}

// 
// Shared drag symbol updates
// 
function onDrag() {
    const lngLat = dragMarker.getLngLat();
    var dragLocationPayload = callSign + `|dragMarker|${lngLat.lng},${lngLat.lat}|dragged` + '\n';
    // NOTE: On meshtastic branch, we disable drag delivery over messaging channel
    // msgSocket.send( dragLocationPayload ); 
}
    
function onDragEnd() {
    const lngLat = dragMarker.getLngLat();
    var dragLocationPayload = callSign + `|dragMarker|${lngLat.lng},${lngLat.lat}|released` + '\n';
    // NOTE: On meshtastic branch, we disable drag delivery over messaging channel
    // msgSocket.send( dragLocationPayload );
}

//
// Show features for debugging, if you enabled this
// change display: [block/none] on edgemap-m.css: #features 
// 
function showFeatures(e)
{
        const features = map.queryRenderedFeatures(e.point);
        // Limit the number of properties we're displaying for
        // legibility and performance
        const displayProperties = [
            'type',
            'properties',
            'id',
            'layer',
            'source',
            'sourceLayer',
            'state'
        ];
        const displayFeatures = features.map((feat) => {
            const displayFeat = {};
            displayProperties.forEach((prop) => {
                displayFeat[prop] = feat[prop];
            });
            return displayFeat;
        });
        document.getElementById('features').innerHTML = JSON.stringify(
            displayFeatures,
            null,
            2
        );
}

function toggleHillShadow() {
    if ( isHidden(logDiv) ) {
        const visibility = map.getLayoutProperty(
            "hills",
            'visibility'
        );
        if (visibility === 'visible') {
            map.setLayoutProperty("hills", 'visibility', 'none');
        } else {
            map.setLayoutProperty("hills", 'visibility', 'visible');
        }   
    }
}

//
// https://stackoverflow.com/questions/11475146/javascript-regex-to-validate-gps-coordinates
//
const regexLat = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
const regexLon = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/;

function check_lat_lon(lat, lon) {
  let validLat = regexLat.test(lat);
  let validLon = regexLon.test(lon);
  return (validLat && validLon);
}

// 
// Loads possibly persisted call sign at:
// /opt/edgemap-persist/callsign.txt
//
function loadCallSign() {
    fetch('load_callsign.php')
    .then(response => response.json())
    .then(data => {
        document.getElementById('myCallSign').value = data.data;
        document.getElementById('callSignDisplay').innerHTML = data.data;
        return data.data;
    })
    .catch(error => {
        console.error('Error:', error);
        return;
    });
}
















