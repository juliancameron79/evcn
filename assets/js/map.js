var map
var infowindow

var request
var service
var marker = []
var location

function initialize() {
	var center = new google.maps.LatLng(51.5074, 0.1278)

	map = new google.maps.Map(document.getElementById('map'), {
		center: center,
		zoom: 13
	})

	request = {
		location: map.getCenter,
		radius: '547',
		tyes: 'parks'
	}

	infoWindow = new google.maps.InfoWindow()

	var service = new google.maps.places.PlacesService(map)
	service.nearbySearch(request, callback)
}

function callback(results, status) {
	if (status === google.maps.places.PlacesServiceStatus.OK) {
		for (var i = 0; i < results.length; i++) {
			marker.push(createMarker(results[i]))
		}
	}
}

function createMarker(place) {
	var place = place.geometry.location
	var marker = new google.maps.Marker({
		map: map,
		position: place.geometry.location
	})

	google.maps.event.addListener(marker, 'click', function() {
		infoWindow.setContent(place.name)
		infoWindow.open(map, this)
	})
	return marker
}

function clearResults(marker) {
	for (var m in marker) {
		marker[m].setMap(null)
	}
	markers = []
}

google.maps.event.addDomListener(window, 'load', initialize)
