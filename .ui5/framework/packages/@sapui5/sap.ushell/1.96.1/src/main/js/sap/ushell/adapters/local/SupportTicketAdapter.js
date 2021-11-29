// Copyright (c) 2009-2021 SAP SE. All rights reserved.

/**
 * @fileOverview The SupportTicket adapter for the local platform.
 *
 * @version 1.96.1
 */
sap.ui.define([
    "sap/ui/thirdparty/jquery"
], function (jQuery) {
    "use strict";

    var SupportTicketAdapter = function (oSystem, sParameter, oAdapterConfiguration) {
        this.createTicket = function (oSupportObject) {
            var oDeferred = new jQuery.Deferred(),
                sTicketId = "1234567";

            oDeferred.resolve(sTicketId);
            return oDeferred.promise();
        };
    };

    return SupportTicketAdapter;
}, /* bExport= */ true);
