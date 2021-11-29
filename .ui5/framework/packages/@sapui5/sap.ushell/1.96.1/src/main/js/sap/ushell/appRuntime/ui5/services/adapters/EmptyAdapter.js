// Copyright (c) 2009-2021 SAP SE. All rights reserved.
sap.ui.define([], function () {
    "use strict";

    var EmptyAdapter = function () {
        this.getSite = function() {
            return new jQuery.Deferred().resolve({}).promise();
        };
    };

    return EmptyAdapter;
}, true);
