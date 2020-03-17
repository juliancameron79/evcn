var map;
var service;

function handleSearchResults(results, status) {
	console.log(results);
	{
		for (var i = 0; i < results.length; i++) {
			var marker = new google.maps.Marker({
				position: results[i].geometry.location,
				animation: google.maps.Animation.DROP,
				map: map,
				icon: '/assets/images/electric_vehicle_charging_station_pinlet-2-medium.png'
			});
		}
	}
}

function performSearch() {
	var request = {
		bounds: map.getBounds(),
		name: ['electric', 'vehicle', 'charging', 'station']
	};
	service.nearbySearch(request, handleSearchResults);
}

function initialise(location) {
	var currentLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);

	var mapOptions = {
		center: currentLocation,
		zoom: 12,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	map = new google.maps.Map(document.getElementById('map'), mapOptions);

	var marker = new google.maps.Marker({
		position: currentLocation,
		map: map
	});

	service = new google.maps.places.PlacesService(map);

	google.maps.event.addListenerOnce(map, 'bounds_changed', performSearch);
}

$(document).ready(function() {
	navigator.geolocation.getCurrentPosition(initialise);
});
