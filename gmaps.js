function initialize() {
    var mapOptions = {
        center: { lat: 37.761513, lng: -122.401830},
        zoom: 11
    };
    var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
}

