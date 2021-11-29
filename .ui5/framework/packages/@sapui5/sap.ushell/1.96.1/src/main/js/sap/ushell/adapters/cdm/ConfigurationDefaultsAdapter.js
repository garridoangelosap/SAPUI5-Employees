// Copyright (c) 2009-2021 SAP SE. All rights reserved.

/**
 * @fileOverview The ConfigurationDefaults adapter for the CDM platform.
 *
 * @version 1.96.1
 */
sap.ui.define([
    "sap/ushell/bootstrap/cdm/cdm.constants",
    "sap/base/util/deepClone"
], function (oCdmConstants, fnDeepClone) {
    "use strict";

    /**
     *
     * @returns {sap.ushell.adapters.cdm.ConfigurationDefaultsAdapter}
     * @private
     */
    return function () {
        /**
         * @returns {Promise} Resolved promise contains all default configuration for CDM platform
         */
        this.getDefaultConfig = function () {
            return Promise.resolve(fnDeepClone(oCdmConstants.defaultConfig));
        };
    };
}, true /* bExport */);
