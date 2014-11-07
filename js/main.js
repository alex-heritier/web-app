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
			var that = this;
			this.name = params.name;
			this.sidebar = params.sidebar;
			this.anchors = params.anchors;
			this.highlights = params.highlights;
			this.visible = false;

			// toggles sidebar visibility and toggles highlight links
			this.toggle = function() {
				// if container is off screen
				if (this.visible === false) {
					this.sidebar.css({
						'left': '0px',
						'opacity': 1
					});
				} else {	// if container is showing
					this.sidebar.css({
						'left': '-500px',
						'opacity': 0
					});
				}
				this.visible = !this.visible;

				// toggle the parent links
				this.highlights.forEach(function(parent) {
					parent.toggleClass('active');
				});
			};

			// initializes the click listener
			this.init = function() {
				this.anchors.click(function() {
					// deactivate all other active links
					Sidebar.sidebars.forEach(function(sbar) {
						if (sbar.visible === true && sbar.name !== that.name) {
							sbar.toggle();
						}
					});
					that.toggle();	// toggle the current sidebar
				});
				return this;
			};
		};

		// the list of sidebars
		Sidebar.sidebars = [
			new Sidebar({	// about sidebar
				name: "about",
				sidebar: $('.about_sidebar'),
				anchors: $('a[href="#/about"]'),
				highlights: [$('a[href="#/about"]').parent()]
			}),
			new Sidebar({	// add report sidebar
				name: "add",
				sidebar: $('.add_report_sidebar'),
				anchors: $('a[href="#/add"]'),
				highlights: [$('a[href="#/add"]').parent(),
					$('a[href="#/add"]').parent().parent().parent()]
			})
		];
		Sidebar.sidebars.forEach(function(sbar) {	// init all sidebars
			sbar.init();
		});
	});
});
