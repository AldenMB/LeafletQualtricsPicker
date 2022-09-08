function MapPicker(div, latLongCallback = console.log){
	const map = L.map(div).setView([0,0], 2);
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
			map.setView([position.coords.latitude, position.coords.longitude], 13);
		});
	}
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '© OpenStreetMap'
	}).addTo(map);
	const marker = L.marker([0, 0],{
		draggable: true
	});
	marker.on('move', function updateLatLong(e){
		latLongCallback(e.latlng);
	});
	map.on('click', function onMapClick(e){
		marker.setLatLng(e.latlng);
		marker.addTo(map);
	});
};

function InsertQualtricsMap(qualtrics){
	qualtrics.hideChoices()
	const div = document.createElement("div");
	div.height = "400px";
	qualtrics.getQuestionContainer().append(div);
	const map = MapPicker(div);
};

export {MapPicker, InsertQualtricsMap};