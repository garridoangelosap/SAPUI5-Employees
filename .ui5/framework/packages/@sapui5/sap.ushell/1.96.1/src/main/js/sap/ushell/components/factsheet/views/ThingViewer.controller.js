// Copyright (c) 2009-2021 SAP SE. All rights reserved.

sap.ui.define([
    "sap/ui/model/odata/ODataModel"
], function (ODataModel) {
    "use strict";

    sap.ui.controller("sap.ushell.components.factsheet.views.ThingViewer", {
        setService: function (sUri) {
            this.getView().setModel(new ODataModel(sUri));
        }
    });
});
