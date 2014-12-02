'use strict';

define(['gmaps', 'jquery', 'handlebars'], function(gmaps, $, Handlebars) {
    var Report,
        initReports,
        register,
        reports = [],
        activeMarker = null,
        infowindow,
        infowindow_template;

    // Reports represent the report data returned from the server
    Report = function(map, params) {
        var that = this,
            date = new Date(Date.now());

        this.report_data = {
            datetime: {
                date: params.datetime ? params.datetime.date : (date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate()),
                time: params.datetime ? params.datetime.time : date.getTime()
            },
            title: params.title,
            description: params.description,
            bribe: {
                category: params.bribe.category,
                requested: params.bribe.requested,
                paid: params.bribe.paid,
                currency: params.bribe.currency
            },
            location: {
                lat: params.location.lat,
                lng: params.location.lng
            },
            image_url: params.image_url
        };
        this.marker = new gmaps.Marker({
            title: this.report_data.title || "A Report!",
            map: map,
            position: this.report_data.location,
            animation: gmaps.Animation.DROP,
        });

        gmaps.event.addListener(this.marker, 'click', function() {
            infowindow.close();
            if (this !== activeMarker) { // if this marker isn't active
                activeMarker = this;                 // set to active marker
                infowindow.open(map, that.marker);   // make active
                infowindow.setContent(infowindow_template(that.report_data));
            } else {
                activeMarker = null; // leave closed and deactivate
            }
        });
    };

    initReports = function(map, data) {
        // get infowindow template
        $.get('partials/infowindow.hbs', function(response) {
            infowindow_template = Handlebars.compile(response);
        });

        // init infowindow
        infowindow = new gmaps.InfoWindow({
            maxWidth: 400,
            minWidth: 400
        });
        gmaps.event.addListener(infowindow, 'closeclick', function() {
            activeMarker = null;
        });

        // init reports
        data.forEach(function(report_data) {
            var report = new Report(map, report_data);
            reports.push(report);
        });

        return reports;
    };

    register = function(map, params, callback) {
        reports.push(new Report(map, params));
        $.post('server/web-app_server/add_report.php', params)
            .fail(function(response) {
                //console.log(response);
                console.log("Cannot save reports to the database when working locally.");
            })
            .always(function(response) {
                callback(response);
            });
    };

    return {
        init: initReports,
        register: register
    }
});
