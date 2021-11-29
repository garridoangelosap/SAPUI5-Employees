/*! 
 * ${copyright} 
 */

/* global Proxy, Reflect, Symbol */

(function(){
/*!
 * ${copyright}
 */
sap.ui.define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FederationType = void 0;
    var FederationType;
    (function (FederationType) {
        FederationType["ranking"] = "ranking";
        FederationType["round_robin"] = "roundRobin";
        FederationType["advanced_round_robin"] = "advancedRoundRobin";
    })(FederationType = exports.FederationType || (exports.FederationType = {}));
});
})();