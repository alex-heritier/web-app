'use strict';

define(['gmaps'], function() {
    var initReports,
        reports = [];

    initReports = function(map, data) {
        data.forEach(function(report, i) {
            reports.push(
                new gmaps.Marker({
                    title: "A Marker!!!",
                    map: map,
                    position: data[i].location
                })
            );
        });

        return reports;
    };

    return {
        init: initReports
    }
});
