'use strict';

define(function() {
    // sidebars: the master array of sidebars
    var sidebars = [],
        Sidebar,
        register,
        init;

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
            if (that.visible === false) {
                that.sidebar.css({
                    'left': '0px',
                    'opacity': 1
                });
            } else {	// if container is showing
                that.sidebar.css({
                    'left': '-500px',
                    'opacity': 0
                });
            }
            that.visible = !that.visible;

            // toggle the parent links
            that.highlights.forEach(function(parent) {
                parent.toggleClass('active');
            });
        };

        // determine visibility
        if (this.visible === true) {
            // make the sidebar visible and temporarily remove transitions

            // so the sidebar doesn't slide in when the page opens
            this.sidebar.css({
                transition: 'none'
            });
            this.visible = false;   // so that toggle makes it visible
            this.toggle();

            // immediately add transitions back
            this.sidebar.css('transition'); // for some reason transition won't change without this
            this.sidebar.css({
                transition: 'left 0.3s linear, opacity 0.3s linear'
            });
        }

        // initializes the click listener
        this.anchors.click(function() {
            // toggle all other active links
            sidebars.forEach(function(sbar) {
                if (sbar.visible === true && sbar.name !== that.name) {
                    sbar.toggle();
                }
            });
            that.toggle();	// toggle the current sidebar
        });
        return this;
    };

    // register(): adds a sidebar to Sidebar.sidebars
    register = function(sidebar_params_array) {
        sidebar_params_array.forEach(function(sidebar_params) {
            sidebars.push(new Sidebar(sidebar_params));
        });
    };

    return {
        register: register
    }
});
