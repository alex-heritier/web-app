'use strict';

define(['gmaps'], function(gmaps) {
    function init_map(id, coordinates) {
        coordinates = coordinates || {lat: 37.761513, lng: -122.401830};
        var mapOptions = {
            center: coordinates,
            zoom: 1,
            disableDefaultUI: true,
            zoomControl: true,
            zoomControlOptions: {
                position: gmaps.ControlPosition.RIGHT_TOP
            }
        };
        return new gmaps.Map(document.getElementById(id), mapOptions);
    }

    return {
        init: init_map
    }
});
