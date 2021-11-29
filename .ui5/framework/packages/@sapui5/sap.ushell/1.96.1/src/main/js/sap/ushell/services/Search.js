// Copyright (c) 2009-2021 SAP SE. All rights reserved.

/**
 * @fileOverview The Unified Shell's search service which provides Enterprise Search via SINA.
 * @version 1.96.1
 */
sap.ui.define([], function () {
    "use strict";

    function Search(oAdapter, oContainerInterface) {
        this.init.apply(this, arguments);
    }

    Search.prototype = {

        init: function (oAdapter, oContainerInterface, sParameter, oServiceProperties) {
            this.oAdapter = oAdapter;
            this.oContainerInterface = oContainerInterface;
            this.appSearchDeferred = null;
        },

        getAppSearch: function () {
            if (this.appSearchPromise) {
                return this.appSearchPromise;
            }

            this.appSearchPromise = new Promise(function (resolve) {
                sap.ui.getCore().loadLibrary("sap.esh.search.ui", { async: true }).then(function () {
                    sap.ui.require(["sap/esh/search/ui/appsearch/AppSearch"], function (AppSearch) {
                        resolve(new AppSearch({}));
                    });
                });
            });

            return this.appSearchPromise;
        },

        isSearchAvailable: function () {
            return this.oAdapter.isSearchAvailable();
        },

        getSina: function () {
            return this.oAdapter.getSina();
        },

        prefetch: function () {
            if (!sap || !sap.uhsell || !sap.ushell.Container) { // because in qunit sap.ushell.Container.getServiceAsync is undefined
                return;
            }
            return this.getAppSearch().then(function (appSearch) {
                return appSearch.prefetch();
            });
        },

        queryApplications: function (query) {
            query.top = query.top || 10;
            query.skip = query.skip || 0;
            return this.getAppSearch().then(function (appSearch) {
                return appSearch.search(query).then(function (searchResult) {
                    return {
                        totalResults: searchResult.totalCount,
                        searchTerm: query.searchTerm,
                        getElements: function () {
                            return searchResult.tiles;
                        }
                    };
                });
            });
        }
    };

    Search.hasNoAdapter = false;
    return Search;
}, true /* bExport */);
