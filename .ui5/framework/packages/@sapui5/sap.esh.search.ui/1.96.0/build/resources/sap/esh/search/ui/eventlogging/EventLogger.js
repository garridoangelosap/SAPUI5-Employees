/*!
 * ${copyright}
 */
/* global */
// @ts-check
sap.ui.define([
    "sap/esh/search/ui/eventlogging/SinaLogConsumer",
    "sap/esh/search/ui/eventlogging/UsageAnalyticsConsumer",
    "sap/esh/search/ui/SearchHelper",
], function (SinaLogConsumer, UsageAnalyticsConsumer, SearchHelper) {
    "use strict";
    // =======================================================================
    // EventLogger (main class for event logging)
    // =======================================================================
    var module = function () {
        this.init.apply(this, arguments);
    };
    /**
     * @type {sap.esh.search.ui.eventlogging.EventLogger.newInstance}
     */
    module.newInstance = function (properties) {
        var logger = new module(); // eslint-disable-line new-cap
        logger.addConsumer(new SinaLogConsumer(properties.sinaNext));
        logger.addConsumer(new UsageAnalyticsConsumer());
        // @ts-ignore
        return logger;
    };
    module.prototype = {
        // this list should match UserEventType in sinas abap_odata provider!
        ITEM_NAVIGATE: "ITEM_NAVIGATE",
        SUGGESTION_SELECT: "SUGGESTION_SELECT",
        SEARCH_REQUEST: "SEARCH_REQUEST",
        RESULT_LIST_ITEM_NAVIGATE_CONTEXT: "RESULT_LIST_ITEM_NAVIGATE_CONTEXT",
        SUGGESTION_REQUEST: "SUGGESTION_REQUEST",
        TILE_NAVIGATE: "TILE_NAVIGATE",
        SHOW_MORE: "SHOW_MORE",
        BROWSER_CLOSE: "BROWSER_CLOSE",
        LEAVE_PAGE: "LEAVE_PAGE",
        SESSION_START: "SESSION_START",
        RESULT_LIST_ITEM_NAVIGATE: "RESULT_LIST_ITEM_NAVIGATE",
        OBJECT_SUGGESTION_NAVIGATE: "OBJECT_SUGGESTION_NAVIGATE",
        DROPDOWN_SELECT_DS: "DROPDOWN_SELECT_DS",
        DATASOURCE_CHANGE: "DATASOURCE_CHANGE",
        FACET_FILTER_ADD: "FACET_FILTER_ADD",
        FACET_FILTER_DEL: "FACET_FILTER_DEL",
        ITEM_SHOW_DETAILS: "ITEM_SHOW_DETAILS",
        ITEM_HIDE_DETAILS: "ITEM_HIDE_DETAILS",
        CLEAR_ALL_FILTERS: "CLEAR_ALL_FILTERS",
        FACET_SHOW_MORE: "FACET_SHOW_MORE",
        FACET_SHOW_MORE_CLOSE: "FACET_SHOW_MORE_CLOSE",
        eventMetadata: {
            SESSION_START: {},
            ITEM_NAVIGATE: {
                systemAndClient: "string",
                sourceUrlArray: "string",
                targetUrl: "string",
            },
            RESULT_LIST_ITEM_NAVIGATE: {
                targetUrl: "string",
                positionInList: "integer",
                executionId: "string",
            },
            SUGGESTION_SELECT: {
                suggestionType: "string",
                suggestionTitle: "string",
                suggestionTerm: "string",
                searchTerm: "string",
                targetUrl: "string",
                dataSourceKey: "string",
            },
            SEARCH_REQUEST: {
                searchTerm: "string",
                dataSourceKey: "string",
            },
            RESULT_LIST_ITEM_NAVIGATE_CONTEXT: {
                systemAndClient: "string",
                sourceUrlArray: "string",
                targetUrl: "string",
            },
            SUGGESTION_REQUEST: {
                suggestionTerm: "string",
                dataSourceKey: "string",
            },
            TILE_NAVIGATE: {
                tileTitle: "string",
                targetUrl: "string",
            },
            SHOW_MORE: {},
            LEAVE_PAGE: {},
            BROWSER_CLOSE: {},
            DROPDOWN_SELECT_DS: {
                dataSourceId: "string",
            },
            DATASOURCE_CHANGE: {
                dataSourceId: "string",
            },
            FACET_FILTER_ADD: {
                referencedAttribute: "string",
                clickedValue: "string",
                clickedPosition: "integer",
            },
            FACET_FILTER_DEL: {
                referencedAttribute: "string",
                clickedValue: "string",
                clickedPosition: "integer",
            },
            FACET_SHOW_MORE: {
                referencedAttribute: "string",
            },
            FACET_SHOW_MORE_CLOSE: {},
        },
        /**
         * @this {sap.esh.search.ui.eventlogging.EventLogger}
         * @constructor
         */
        init: function () {
            this.consumers = [];
        },
        /**
         * @this {sap.esh.search.ui.eventlogging.EventLogger}
         */
        addConsumer: function (consumer) {
            this.consumers.push(consumer);
            consumer.eventLogger = this;
        },
        /**
         * @this {sap.esh.search.ui.eventlogging.EventLogger}
         */
        logEvent: function (event) {
            if (!SearchHelper.isLoggingEnabled()) {
                return;
            }
            for (var i = 0; i < this.consumers.length; ++i) {
                var consumer = this.consumers[i];
                try {
                    consumer.logEvent(event);
                }
                catch (e) {
                    // error in logging shall not break app
                }
            }
        },
    };
    return module;
});
