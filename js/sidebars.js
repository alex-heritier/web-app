'use strict';

define(function() {
    var initSidebars = function() {
        var Sidebar;

        // class that stores links, highlight items and init code for sidebar menus
        Sidebar = function(params) {
            var that = this;
            this.name = params.name;
            this.sidebar = params.sidebar;
            this.anchors = params.anchors;
            this.highlights = params.highlights;
            this.visible = params.visible || false;

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

        // Sidebar.sidebars: the master array of sidebars
        Sidebar.sidebars = [];

        // Sidebar.register(): adds a sidebar to Sidebar.sidebars
        Sidebar.register = function(sidebar_params) {
            Sidebar.sidebars.push(new Sidebar(sidebar_params));
            return Sidebar;
        };

        // Initialize Sidebar.sidebars
        Sidebar.register({	// about sidebar
            name: "about",  // the sidebars unique name
            sidebar: $('.about_sidebar'),   // the sidebar element
            anchors: $('a[href="#/about"]'),    // the sidebar's link
            highlights: [$('a[href="#/about"]').parent()],  // the elements that are made active
            visible: true   // the sidebar's starting visibility
        }).register({	// add report sidebar
            name: "add",
            sidebar: $('.add_report_sidebar'),
            anchors: $('a[href="#/add"]'),
            highlights: [$('a[href="#/add"]').parent(),
                $('a[href="#/add"]').parent().parent().parent()],
            visible: false
        });

        return Sidebar.sidebars;
    };

    return {
        init: initSidebars
    }
});
