// Copyright (c) 2009-2021 SAP SE. All rights reserved.
/**
 * @fileOverview The Search adapter for the demo platform.
 *
 * @version 1.96.1
 */
sap.ui.define([
    "sap/ui/thirdparty/jquery"
], function (jQuery, sina) {
    "use strict";

    /**
     *
     * @param oSystem
     * @returns {sap.ushell.adapters.abap.SearchAdapter}
     */
    var SearchAdapter = function (oSystem, sParameter, oAdapterConfiguration) {

        this.isSearchAvailable = function () {
            var oDeferred = jQuery.Deferred();
            oDeferred.resolve(true);
            return oDeferred.promise();
        };

        //@deprecated
        this.getSina = function () {
            return {};
        };
    };


	return SearchAdapter;

}, /* bExport= */ true);
