// Copyright (c) 2009-2021 SAP SE. All rights reserved.

/**
 * @fileOverview URLShortening
 *
 * Service wrapper for the sap/ushell/utils/UrlShortening module.
 * Deprecated. Please use the UrlShortening module directly.
 *
 * @version 1.96.1
 */
 sap.ui.define(["sap/ushell/utils/UrlShortening"], function (UrlShortening) {
    "use strict";
    function URLShortening () {
        this.compactHash = UrlShortening.compactHash.bind(UrlShortening);
        this.checkHashLength = UrlShortening.checkHashLength.bind(UrlShortening);
        this.expandHash = UrlShortening.expandHash.bind(UrlShortening);
        this.expandParamGivenRetrievalFunction = UrlShortening.expandParamGivenRetrievalFunction.bind(UrlShortening);
    }

    URLShortening.hasNoAdapter = true;
    return URLShortening;
}, true /* bExport */);
