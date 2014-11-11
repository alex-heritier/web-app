'use strict';

define(['gmaps'], function(gmaps) {
    var Report,
        initReports,
        register,
        reports = [],
        activeMarker = null,
        infowindow,
        makeWindowContent;

    // Reports represent the report data returned from the server
    Report = function(map, params) {
        var that = this;

        this.datetime = {
            date: params.datetime.date,
            time: params.datetime.time
        };
        this.title = params.title;
        this.description = params.description;
        this.bribe = {
            category: params.bribe.category,
            requested: params.bribe.requested,
            paid: params.bribe.paid,
            currency: params.bribe.currency
        };
        this.location = {
            lat: params.location.lat,
            lng: params.location.lng
        },
        this.image_url = params.image_url;
        this.marker = new gmaps.Marker({
            title: this.title || "A Report!",
            map: map,
            position: this.location
        });

        gmaps.event.addListener(this.marker, 'click', function() {
            infowindow.close();
            if (this !== activeMarker) { // if this marker isn't active
                activeMarker = this;                 // set to active marker
                infowindow.open(map, that.marker);   // make active
                infowindow.setContent(makeWindowContent(that));
            } else {
                activeMarker = null; // leave closed and deactivate
            }
        });
    };

    // creates infowindow's content
    makeWindowContent = function(that) {
        return "<div class='infowindow'>" +
            "<p class='title'>Title: " + that.title + "</p>" +
            "<div class='infowindow_left'>" +
                "<img src='" + that.image_url + "'>" +
            "</div>" +
            "<div class='infowindow_right'>" +
                "<p class='category'>Category: " + that.bribe.category + "</p>" +
                "<p class='requested'>Amount requested: " + that.bribe.requested + "</p>" +
                "<p class='paid'>Amount paid: " + that.bribe.paid + "</p>" +
                "<p class='currency'>Currency: " + that.bribe.currency + "</p>" +
            "</div>" +
            "<p class='description'>Description: " + that.description + "</p>" +
        "</div>";
    };

    initReports = function(map, data) {
        // init infowindow
        infowindow = new gmaps.InfoWindow({
            maxWidth: 400
        });
        gmaps.event.addListener(infowindow, 'closeclick', function() {
            activeMarker = null; // deactivate
        });

        // init reports
        data.forEach(function(report_data) {
            var report = new Report(map, report_data);
            reports.push(report);
        });

        return reports;
    };

    register = function(params) {
        reports.push(new Report(map, params));
    };

    return {
        init: initReports,
        register: register
    }
});
