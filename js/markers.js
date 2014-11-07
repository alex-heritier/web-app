'use strict';

define(['gmaps'], function(gmaps) {
    var initMarkers;

    initMarkers = function(map) {
        var marker;

        marker = new gmaps.Marker({
            position: map.getCenter(),
            title: "Hello World!",
            animation: gmaps.Animation.DROP,
            map: map
        });
    };

    return {
        init: initMarkers
    }
});
