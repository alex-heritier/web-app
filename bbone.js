
window.onload = function() {

var AppRouter = Backbone.Router.extend({
	routes: {
		"home": "homeScreen",
		"reports/add/": "addReport",
		"reports/view/:id": "viewReport",
		"*actions": "defaultRoute" // matches http://example.com/#anything-here
        }
});
    // Initiate the router
var app_router = new AppRouter;

app_router.on('route:defaultRoute', function(actions) {
	alert(actions);
});

app_router.on('route:homeScreen', function() {
	alert("homeScreen");
});

app_router.on('route:addReport', function() {
	alert("addReport");
});

app_router.on('route:viewReport', function(id) {
	alert("viewReport: " + id);
});

    // Start Backbone history a necessary step for bookmarkable URL's
Backbone.history.start();

var reportDetails = {
    title: "Some new report",
    description: "Hello World!",
    bribe: {
        category: "Something",
        requested: 2134,
        paid: 1234,
        currency: "USD"
    },
    location: {
        latitude: 37.761513,
        longitude: -122.401830
    },
    image: "/img/yolo.jpg"
};

Report = Backbone.Model.extend({
    urlRoot: 'server/add_report.php',
    defaults: reportDetails,
    initialize: function() {
        console.log(this.get("title"));
        this.on("change:title", function() {
            console.log("NEW TITLE: " + this.get("title"));
        });
        this.set({title: "I've been bribed!"});
    }
});

var report = new Report({title: "I need help"});

report.save(reportDetails, {
    success: function (response) {
	console.log(response.toJSON());
    },
    error: function(model, response) {
        console.log(model + ' error! ' + response.responseText);
        console.log(JSON.stringify(response));
    }
});

}

