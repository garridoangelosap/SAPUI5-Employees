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
    exports.SuggestionType = void 0;
    var SuggestionType;
    (function (SuggestionType) {
        SuggestionType["SearchTerm"] = "SearchTerm";
        SuggestionType["SearchTermAndDataSource"] = "SearchTermAndDataSource";
        SuggestionType["Object"] = "Object";
        SuggestionType["DataSource"] = "DataSource";
    })(SuggestionType = exports.SuggestionType || (exports.SuggestionType = {}));
});
})();