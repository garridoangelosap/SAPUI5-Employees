// Copyright (c) 2009-2021 SAP SE. All rights reserved.

sap.ui.define([], function () {
    "use strict";
    function validateValueIsNotUndefined (newValue) {
        return newValue !== undefined;
    }

    function execute (vCurrentValue, vValueToAdjust) {
        if (validateValueIsNotUndefined(vValueToAdjust)) {
            return vValueToAdjust;
        }
        return vCurrentValue;
    }

    return {
        execute: execute
    };
});
