let map = null;

function initMap() {
	navigator.geolocation.getCurrentPosition(function(pos) {
		location.lat = pos.coords.latitude;
		location.long = pos.coords.longitude;
		map = new google.maps.Map(document.getElementById('map'), {
			center: { lat: location.lat, lng: location.long },
			zoom: 15
		});
		getRestaurants(location);
	});
}

function getRestaurants(location) {
	var pyrmont = new google.maps.LatLng(location.lat, location.long);
	var request = {
		location: pyrmont,
		radius: '1500',
		type: ['restaurant']
	};
	service = new google.maps.places.PlacesService(map);
	service.nearbySearch(request, callback);
}

function callback(results, status) {
	if (status == 'OK') {
		for (var i = 0; i < results.length; i++) {
			var place = results[i];

			var marker = new google.maps.Marker({
				position: place.geometry.location,
				map: map,
				title: place.name
			});
			var content = place.name;

			var infowindow = new google.maps.InfoWindow({
				content: content
			});

			bindInfoWindow(marker, map, infowindow, content);
			marker.setMap(map);
		}
	}
}

function bindInfoWindow(marker, map, infowindow, html) {
	marker.addListener('click', function() {
		infowindow.setContent(html);
		infowindow.open(map, this);
	});
}
