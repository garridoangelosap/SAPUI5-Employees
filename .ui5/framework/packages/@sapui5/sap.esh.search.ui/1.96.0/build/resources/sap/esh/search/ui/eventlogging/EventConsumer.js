/*!
 * ${copyright}
 */
/* global */
// @ts-check
sap.ui.define([], function () {
    "use strict";
    // =======================================================================
    // EventConsumer (base class for all consumers)
    // =======================================================================
    var module = function () {
        this.init.apply(this, arguments);
    };
    module.prototype = {
        init: function () { },
        logEvent: function () {
            // to be implemented in subclass
        },
    };
    return module;
});
