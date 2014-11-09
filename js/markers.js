'use strict';

define(['gmaps'], function(gmaps) {
    var initMarkers,
        markers = [];

    initMarkers = function(map, data) {
        data.forEach(function(marker, i) {
            markers.push(
                new gmaps.Marker({
                    title: "A Marker!!!",
                    map: map,
                    position: data[i].location
                })
            );
        });

        return markers;
    };

    return {
        init: initMarkers
    }
});
