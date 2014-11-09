'use strict';

define(['markers'], function() {
    var processMarkers = function(report_data) {
        return $.parseJSON(report_data);
    };

    return {
        processMarkers: processMarkers
    }
});
