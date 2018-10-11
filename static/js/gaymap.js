var map;
var saved_lat;
var saved_lon;

function onLocationFound(e) {
	var radius = e.accuracy / 2;
	
	// L.circle(e.latlng, radius).addTo(map);
	L.marker(e.latlng).addTo(map);
	map.setView(e.latlng, 17);
}

function onLocationError(e) {
	alert(e.message);
}

function element_to_map(data) {
	var condomIcon;
	var gayIcon;
	var gayOnlyIcon;
	var gayWelcomeIcon;
	var poi_markers = new Array();
  
	condomIcon = L.icon({
		iconUrl: '/img/condom.png',
		iconSize: [30, 30],
		iconAnchor: [15, 15],
		popupAnchor: [0, -15]
	});

	gayIcon = L.icon({
		iconUrl: '/img/stripclub2.png',
		iconSize: [30, 30],
		iconAnchor: [15, 15],
		popupAnchor: [0, -15]
	});

	gayOnlyIcon = L.icon({
		iconUrl: '/img/gayonly.png',
		iconSize: [30, 30],
		iconAnchor: [15, 15],
		popupAnchor: [0, -15]
	});

	gayWelcomeIcon = L.icon({
		iconUrl: '/img/gaywelcome.png',
		iconSize: [30, 30],
		iconAnchor: [15, 15],
		popupAnchor: [0, -15]
	});
	
	$.each(poi_markers, function(_, mrk) {
		map.removeLayer(mrk);
	});

	$.each(data.elements, function(_, el) {
		if(el.lat == undefined) {
			el.lat = el.center.lat;
			el.lon = el.center.lon;
		}

		if(el.tags != undefined && el.tags.entrance != "yes") {
			var mrk, popup_content;

			if(el.tags.vending != undefined) {
				mrk = L.marker([el.lat, el.lon], {icon: condomIcon});
				mrk.bindPopup("Condom vending machine");
			} else {
				if (el.tags.gay == "yes") {
					mrk = L.marker([el.lat, el.lon], {icon: gayIcon});
				} else if(el.tags.gay == "only") {
					mrk = L.marker([el.lat, el.lon], {icon: gayOnlyIcon});
				} else if(el.tags.gay == "welcome") {
					mrk = L.marker([el.lat, el.lon], {icon: gayWelcomeIcon});
				}
							
				text = "<b>" + el.tags.name + "</b>";
				
				switch (el.tags.amenity) {
					case "bar":
						text += " (bar)";
						break;
					case "restaurant":
						text += " (restaurant)";
						break;
					case "cafe":
						text += " (cafè)";
						break;
					case "fast_food":
						text += " (fast food)";
						break;
					case undefined:
						if (el.tags.office == "association") {
							text += " (association)";
						} 
						break;
					default:
						text += " (" + el.tags.amenity + ")";
						break;
				}
				
				text += "<div class=\"more_on_osm\"><a href=\"https://www.openstreetmap.org/" + el.type + "/" + el.id + "\">More...</a></div>";
				
				mrk.bindPopup(text);
			}
		}
		poi_markers.push(mrk);
		mrk.addTo(map);
	});
}

function getPOI() {
	var bbox;
	var dataJSON;
	
	if (map.getZoom() < 12) {
		return null;
	}

	localStorage.setItem("pos_lat", map.getCenter().lat);
	localStorage.setItem("pos_lon", map.getCenter().lng);

	bbox = map.getBounds().getSouth() + "," + map.getBounds().getWest() + "," + map.getBounds().getNorth() +  "," + map.getBounds().getEast();
	
	$.ajax({
		dataType: "json",
		url: "https://overpass-api.de/api/interpreter",
		data: {
			"data": '[out:json][timeout:25];(node["vending"="condoms"]('+bbox+');way["vending"="condoms"]('+bbox+');relation["vending"="condoms"]('+bbox+');node["gay"="yes"]('+bbox+');way["gay"="yes"]('+bbox+');relation["gay"="yes"]('+bbox+');node["gay"="welcome"]('+bbox+');way["gay"="welcome"]('+bbox+');relation["gay"="welcome"]('+bbox+');node["gay"="only"]('+bbox+');way["gay"="only"]('+bbox+');relation["gay"="only"]('+bbox+');); out body center;'
		},
		success: element_to_map
	});
}

map = L.map('map')

saved_lat = localStorage.getItem("pos_lat");
saved_lon = localStorage.getItem("pos_lon");

if(saved_lat != undefined) {
	map.setView([saved_lat, saved_lon], 17);
} else {
	map.setView([45, 8], 15);
}
	
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=YOURTOKENHERE', {
    attribution: '<a href="https://www.openstreetmap.org/fixthemap">Missing something?</a> · <a href="./legal.html">Legal</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'YOURTOKENHERE'
}).addTo(map);


map.addControl( new L.Control.Search({
	url: 'http://nominatim.openstreetmap.org/search?format=json&q={s}',
	jsonpParam: 'json_callback',
	propertyName: 'display_name',
	propertyLoc: ['lat', 'lon'],
	marker: L.circleMarker([0,0], {radius:3}),
	autoCollapse: true,
	autoType: false,
	minLength: 3
}) );

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);
	
map.locate({setView: true, maxZoom: 17});

L.control.locate({drawMarker: true, flyTo: true}).addTo(map);

map.on('moveend', getPOI);

getPOI();
