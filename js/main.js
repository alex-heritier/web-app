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

require(['jquery', 'maps', 'sidebars', 'markers', 'reports', 'bootstrap'], function($, maps, sb, markers, reports) {
	$(document).ready(function() {
		var map,
			sidebars,
			report_data,
			marker_list;

		map = maps.init("map_canvas", {lat: 22.5500, lng: 114.1000});
		sidebars = sb.init();

		report_data = [
			{
				location: {
					lat: 50,
					lng: 90
				}
			},
			{
				location: {
					lat: 10,
					lng: 30
				}
			},
		];
		var result = $.get("server/get_report.php", function(data) {
			marker_list = markers.init(map, data);
		});

		/*
		var result = $.get("server/get_report.php", function(data) {
			markers.createMarkers(map, data);
		});//*/
	});
});
