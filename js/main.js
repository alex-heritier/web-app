'use strict';

requirejs.config({
	baseUrl: 'js/',
	shim: {
		'bootstrap': {
			deps: ['jquery']
		},
		'jquery_ui': {
			deps: ['jquery']
		}
	},
	paths: {
		'jquery': '//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min',
		'bootstrap': '//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min',
		'async': 'lib/async'
	}
});

// creates a gmaps module that asynchronously loads the google maps API
define('gmaps', ['async!http://maps.google.com/maps/api/js?v=3&sensor=false'],
function(){
    // return the gmaps namespace for brevity
    return window.google.maps;
});

require(['jquery', 'maps', 'sidebars', 'reports', 'bootstrap'], function($, maps, sb, reports) {
	$(document).ready(function() {
		var map,
			sidebars,
			report_data,
			report_list;

		map = maps.init("map_canvas", {lat: 22.5500, lng: 114.1000});
		sidebars = sb.init();

		$.get("server/web-app_server/get_report.php", function(data) {
			try {	// works online, fails locally
				report_data = $.parseJSON(data);
			}
			catch (e) {	// if local, make random locations
				report_data = [];
				for (var i = 0; i < 20; i++) {
					report_data.push({
						location: {
							lat: Math.floor(Math.random() * 180) - 90,
							lng: Math.floor(Math.random() * 180) - 90
						}
					});
				}
			}
			report_data.forEach(function(report) {
				report.location.lat = parseFloat(report.location.lat);
				report.location.lng = parseFloat(report.location.lng);
			});
			report_list = reports.init(map, report_data);
		});
	});
});
