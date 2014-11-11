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

		// setup markers
		$.get('server/web-app_server/get_report.php', function(data) {
			try {	// works online, fails locally
				report_data = $.parseJSON(data);
				report_data.forEach(function(report) {
					report.location.lat = parseFloat(report.location.lat);
					report.location.lng = parseFloat(report.location.lng);
				});
			}
			catch (e) {	// if local, make random locations
				report_data = [];
				for (var i = 0; i < 60; i++) {
					var date = new Date(Date.now());
					report_data.push({
						datetime: {
							date: date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate(),
							time: date.getTime()
						},
						title: "A title! " + Math.floor(Math.random() * 100),
						description: "Some random description " + Math.floor(Math.random() * 180),
						bribe: {
							category: "Bribe",
							requested: Math.floor(Math.random() * 1000),
							paid: Math.floor(Math.random() * 800),
							currency: "USD"
						},
						location: {
							lat: Math.floor(Math.random() * 180) - 90,
							lng: Math.floor(Math.random() * 360) - 180
						},
						image_url: "http://www.austintexas.gov/sites/default/files/files/Animal_Services/cute-kitten-playing.jpg"
					});
				}
			}
			// populate map with markers
			report_list = reports.init(map, report_data);
		});

		// report submission code
		$('.add_report_submit').click(function() {
			var submit_progress,
				new_report;

			submit_progress = $('.add_report_progress');
			new_report = {
				title: $('input[name=title]').val(),
				description: $('textarea[name=description]').val(),
				bribe: {
					category: $('select[name=category]').val(),
					requested: $('input[name=requested]').val(),
					paid: $('input[name=paid]').val(),
					currency: $('input[name=currency]').val()
				},
				location: {
					lat: parseFloat($('input[name=lat]').val()),
					lng: parseFloat($('input[name=lng]').val())
				},
				image_url: $('input[name=image_url]').val()
			};
			submit_progress.text("Submitting...");
			reports.register(map, new_report, function(response) {
				submit_progress.text("Submitted!");
			});
		});
	});
});
