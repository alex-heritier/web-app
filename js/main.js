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
			report_list,
			URL_parameters;

		// initialize the canvas as a google map
		map = maps.init("map_canvas", {lat: 22.5500, lng: 114.1000});
		// add the divs to the list of sidebars
		URL_parameters = document.URL.split(/\/(?=#)/)[1];	// get URL_parameters parameters
		sidebars = sb.register([
			{	// about sidebar
				name: "about",  // the sidebars unique name
				sidebar: $('.about_sidebar'),   // the sidebar element
				anchors: $('a[href="#/about"]'),    // the sidebar's link
				highlights: [$('a[href="#/about"]').parent()],  // the elements that are made active
				visible: URL_parameters ? URL_parameters === "#/about" : true	// default sidebar
			},
			{	// add report sidebar
				name: "add",
				sidebar: $('.add_report_sidebar'),
				anchors: $('a[href="#/add"]'),
				highlights: [$('a[href="#/add"]').parent(),
					$('a[href="#/add"]').parent().parent().parent()],
				visible: URL_parameters === "#/add"
			},
			{	// view report sidebar
				name: "view",
				sidebar: $('.view_report_sidebar'),
				anchors: $('a[href="#/view"]'),
				highlights: [$('a[href="#/view"]').parent(),
					$('a[href="#/view"]').parent().parent().parent()],
				visible: URL_parameters === "#/view"
			}
		]);

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

			// a div that to display submit progress
			submit_progress = $('.add_report_progress');
			// the report to submit to the server
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
