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
    exports.FacetMode = void 0;
    var FacetMode;
    (function (FacetMode) {
        // every subprovider seperate as a subtree, with a root with subprovider_all
        FacetMode["tree"] = "tree";
        // all subprovider facets will be merged and sorted
        FacetMode["flat"] = "flat";
    })(FacetMode = exports.FacetMode || (exports.FacetMode = {}));
});
})();