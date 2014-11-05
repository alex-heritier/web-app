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
		'jquery_ui': '//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min',
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

require(['jquery', 'maps', 'bootstrap', 'jquery_ui'], function($, maps) {
	$(document).ready(function() {
		var map,
			getLinkListener,
			about_link,
			about_parents,
			add_report_link,
			add_report_parents,
			Sidebar,
			sidebars;

		map = maps.init("map_canvas", {lat: 22.5500, lng: 114.1000});

		// class that stores links, highlight items and init code for sidebar menus
		Sidebar = function(params) {
			this.sidebar = params.sidebar;
			this.anchors = params.anchors;
			this.highlights = params.highlights;
			this.init = function() {

			};
		};

		getLinkListener = function(container, link_parents) {
			return function() {
				// deactivate all other active links
				if (!$('.about_container').is(container) && $('.about_container').css('left') === "0px") {
					$('a[href="#/about"]').trigger('click');
				}
				if (!$('.add_report_container').is(container) && $('.add_report_container').css('left') === "0px") {
					$('a[href="#/add"]').trigger('click');
				}

				// if container is off screen
				if (container.css('left') !== "0px") {
					container.css({
						'left': '0px',
						'opacity': 1
					});
				} else {	// if container is showing
					container.css({
						'left': '-500px',
						'opacity': 0
					});
				}
				// make the parent links active
				link_parents.forEach(function(parent) {
					parent.toggleClass('active');
				});
			}
		};

		about_link = $('a[href="#/about"]');
		about_parents = [];
		about_parents.push(about_link.parent());
		about_link.click(getLinkListener($('.about_container'), about_parents));

		add_report_link = $('a[href="#/add"]');
		add_report_parents = [];
		add_report_parents.push(add_report_link.parent(), add_report_link.parent().parent().parent());
		add_report_link.click(getLinkListener($('.add_report_container'), add_report_parents));
	});
});
