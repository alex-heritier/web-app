'use strict';

define(['gmaps'], function(gmaps) {
    var Report,
        initReports,
        reports = [];

    Report = function(map, params) {
        var that = this,
            makeWindowContent;

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

        makeWindowContent = function() {
            return "<div class='infowindow'>" +
                "<p class='title'>Title: " + that.title + "</p>" +
                "<p class='description'>Description: " + that.description + "</p>" +
                "<div class='bribe'>" +
                    "<p class='category'>Category: " + that.bribe.category + "</p>" +
                    "<p class='requested'>Amount requested: " + that.bribe.requested + "</p>" +
                    "<p class='paid'>Amount paid: " + that.bribe.paid + "</p>" +
                    "<p class='currency'>Currency: " + that.bribe.currency + "</p>" +
                "</div>" +
                "<img src='" + that.image_url + "'>" +
            "</div>";
        };

        google.maps.event.addListener(this.marker, 'click', function() {
            Report.infowindow.close();
            console.log("this: " + this);
            console.log("activeMarker: " + Report.activeMarker);
            if (this !== Report.activeMarker) { // if this marker isn't active
                Report.activeMarker = this;                 // set to active marker
                Report.infowindow.open(map, that.marker);   // make active
                Report.infowindow.setContent(makeWindowContent());
            } else {
                Report.activeMarker = null; // leave closed and deactivate
            }
        });
        google.maps.event.addListener(this.marker, 'closeclick', function() {
            Report.activeMarker = null; // deactivate
        });
    };
    Report.activeMarker = null; // the marker with the infowindow
    Report.infowindow = new gmaps.InfoWindow({
        maxWidth: 400
    });

    initReports = function(map, data) {
        data.forEach(function(report_data) {
            var report = new Report(map, report_data);
            reports.push(report);
        });

        return reports;
    };

    return {
        init: initReports
    }
});
