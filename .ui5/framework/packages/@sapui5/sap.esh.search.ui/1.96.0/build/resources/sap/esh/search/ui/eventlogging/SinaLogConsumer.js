/*!
 * ${copyright}
 */
/* global */
// @ts-check
sap.ui.define(["sap/esh/search/ui/eventlogging/EventConsumer"], function (EventConsumer) {
    "use strict";
    // =======================================================================
    // SinaLogConsumer
    // =======================================================================
    var module = function () {
        this.init.apply(this, arguments);
    };
    module.prototype = jQuery.extend(new EventConsumer(), {
        /**
         * @this sap.esh.search.ui.eventlogging.SinaLogConsumer
         */
        init: function (sinaNext) {
            this.sinaNext = sinaNext;
        },
        /**
         * @this sap.esh.search.ui.eventlogging.SinaLogConsumer
         */
        logEvent: function (event) {
            this.sinaNext.logUserEvent(event);
        },
    });
    return module;
});
