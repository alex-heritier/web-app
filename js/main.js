'use strict';

requirejs.config({
	baseUrl: 'js/',
	shim: {
		'bootstrap': {
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

require(['jquery', 'maps', 'bootstrap'], function($, maps) {
	$(document).ready(function() {
		var map = maps.init("map_canvas", {lat: 35.6895, lng: 139.6917});
	});
});
