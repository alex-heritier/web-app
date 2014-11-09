'use strict';

define(['gmaps'], function(gmaps) {
    var initReports,
        reports = [];

    initReports = function(map, data) {
        data.forEach(function(report) {
            reports.push(
                new gmaps.Marker({
                    title: report.title || "A Report!",
                    map: map,
                    position: report.location
                })
            );
        });

        return reports;
    };

    return {
        init: initReports
    }
});
