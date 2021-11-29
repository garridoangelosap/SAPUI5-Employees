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
    exports.SinaObject = void 0;
    var SinaObject = /** @class */ (function () {
        function SinaObject(properties) {
            if (properties === void 0) { properties = {}; }
            var _a, _b;
            this._private = {};
            this.sina = (_a = properties.sina) !== null && _a !== void 0 ? _a : this.sina;
            this._private = (_b = properties._private) !== null && _b !== void 0 ? _b : this._private;
        }
        SinaObject.prototype.getSina = function () {
            return this.sina;
        };
        return SinaObject;
    }());
    exports.SinaObject = SinaObject;
});
})();