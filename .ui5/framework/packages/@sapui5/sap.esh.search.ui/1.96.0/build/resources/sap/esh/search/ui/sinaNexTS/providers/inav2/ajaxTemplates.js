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
    exports.loadDataSourceMetadataRequest = exports.incrementClickCounterRequest = exports.resetPersonalizedSearchDataRequest = exports.saveConfigurationRequest = exports.getConfigurationRequest = exports.suggestionRequest = exports.chartRequest = exports.searchRequest = exports.fallbackLoadDataSourcesRequest = exports.loadDataSourcesRequest = void 0;
    exports.loadDataSourcesRequest = {
        DataSource: {
            ObjectName: "$$DataSources$$",
            PackageName: "ABAP",
        },
        Options: ["SynchronousRun"],
        Search: {
            Top: 1000,
            Skip: 0,
            OrderBy: [
                {
                    AttributeName: "Description",
                    SortOrder: "ASC",
                },
                {
                    AttributeName: "ObjectName",
                    SortOrder: "ASC",
                },
            ],
            Expand: ["Grid", "Items"],
            Filter: {
                Selection: {
                    Operator: {
                        Code: "And",
                        SubSelections: [
                            {
                                MemberOperand: {
                                    AttributeName: "SupportedService",
                                    Comparison: "=",
                                    Value: "Search",
                                },
                            },
                            {
                                MemberOperand: {
                                    AttributeName: "Type",
                                    Comparison: "=",
                                    Value: "View",
                                },
                            },
                        ],
                    },
                },
            },
            NamedValues: [
                {
                    AttributeName: "ObjectName",
                    Name: "ObjectName",
                },
                {
                    AttributeName: "Description",
                    Name: "Description",
                },
                {
                    AttributeName: "Type",
                    Name: "Type",
                },
                //, {"AttributeName": "DescriptionPlural", "Name": "DescriptionPlural"}
            ],
        },
        SearchTerms: "*",
        ServiceVersion: 204,
    };
    exports.fallbackLoadDataSourcesRequest = {
        DataSource: {
            SchemaName: "",
            PackageName: "ABAP",
            ObjectName: "",
            type: "Connector",
        },
        Search: {
            Top: 1000,
            Skip: 0,
            OrderBy: [
                {
                    AttributeName: "DESCRIPTION",
                    SortOrder: "ASC",
                },
            ],
            Expand: ["Grid", "Items", "TotalCount"],
            Filter: {},
            NamedValues: [
                {
                    AttributeName: "$$ResultItemAttributes$$",
                    Name: "$$ResultItemAttributes$$",
                },
                {
                    AttributeName: "$$RelatedActions$$",
                    Name: "$$RelatedActions$$",
                },
            ],
            SearchTerms: "*",
            SelectedValues: [],
        },
        SearchTerms: "*", // asterisk
    };
    exports.searchRequest = {
        DataSource: {},
        Options: ["SynchronousRun"],
        Search: {
            Expand: ["Grid", "Items", "ResultsetFacets", "TotalCount"],
            Filter: {
                Selection: {
                    Operator: {
                        Code: "And",
                        SubSelections: [
                            {
                                MemberOperand: {
                                    AttributeName: "$$RenderingTemplatePlatform$$",
                                    Comparison: "=",
                                    Value: "html",
                                },
                            },
                            {
                                MemberOperand: {
                                    AttributeName: "$$RenderingTemplateTechnology$$",
                                    Comparison: "=",
                                    Value: "Tempo",
                                },
                            },
                            {
                                MemberOperand: {
                                    AttributeName: "$$RenderingTemplateType$$",
                                    Comparison: "=",
                                    Value: "ResultItem",
                                },
                            },
                        ],
                    },
                },
            },
            Top: 10,
            Skip: 0,
            SearchTerms: "S*",
            NamedValues: [
                {
                    Function: "WhyFound",
                    Name: "$$WhyFound$$",
                },
                {
                    Function: "RelatedActions",
                    Name: "$$RelatedActions$$",
                },
                {
                    AttributeName: "$$RelatedActions.Proxy$$",
                },
            ],
            OrderBy: [],
        },
        ServiceVersion: 204,
    };
    exports.chartRequest = {
        DataSource: {},
        Options: ["SynchronousRun"],
        Search: {
            Expand: ["Grid", "ResultsetFacets", "TotalCount"],
            Filter: {},
            Top: 10,
            Skip: 0,
            SearchTerms: "*",
            NamedValues: [
                {
                    Function: "WhyFound",
                    Name: "$$WhyFound$$",
                },
                {
                    AttributeName: "$$RelatedActions$$",
                },
                {
                    AttributeName: "$$RelatedActions.Proxy$$",
                },
            ],
            OrderBy: [],
        },
        ServiceVersion: 204,
        Facets: {
            MaxNumberOfReturnValues: 1000,
            Attributes: [],
        },
    };
    exports.suggestionRequest = {
        DataSource: {},
        Options: ["SynchronousRun"],
        Suggestions2: {
            Expand: ["Grid", "Items"],
            Filter: {},
            Precalculated: false,
            AttributeNames: [],
            Top: 10,
            Skip: 0,
        },
        ServiceVersion: 204,
    };
    exports.getConfigurationRequest = {
        SearchConfiguration: {
            Action: "Get",
            Data: {
                PersonalizedSearch: {},
            },
        },
    };
    exports.saveConfigurationRequest = {
        SearchConfiguration: {
            Action: "Update",
            Data: {
                PersonalizedSearch: {
                    SessionUserActive: true,
                },
            },
        },
    };
    exports.resetPersonalizedSearchDataRequest = {
        SearchConfiguration: {
            Action: "Update",
            Data: {
                PersonalizedSearch: {
                    ResetUserData: true,
                },
            },
        },
    };
    exports.incrementClickCounterRequest = {
        SearchConfiguration: {
            Action: "Update",
            ClientEvent: {
                NavigationEventList: [
                    {
                        SourceApplication: {
                            SemanticObjectType: "Action",
                            Intent: "search",
                            ParameterList: [
                                {
                                    Name: "searchterm",
                                    Value: "*", // asterisk
                                },
                                {
                                    Name: "datasource",
                                    Value: '{"label":"Purchase Order","labelPlural":"Purchase Orders","SchemaName":{"label":"","value":""},"PackageName":{"label":"ABAP","value":"ABAP"},"ObjectName":{"label":"CES002~EPM_PO_DEMO~","value":"CES002~EPM_PO_DEMO~"},"Type":"BusinessObject"}',
                                },
                                {
                                    Name: "top",
                                    Value: "10",
                                },
                                {
                                    Name: "filter",
                                    Value: '{"operator":"And","label":"DefaultRoot","conditions":[]}',
                                },
                            ],
                        },
                    },
                    {
                        TargetApplication: {
                            SemanticObjectType: "EPMPurchaseOrder",
                            Intent: "displayFactSheet",
                            ParameterList: [
                                {
                                    Name: "PurchaseOrderInternalId",
                                    Value: "3440B5B014B21EE798DDB43D63E56068",
                                },
                            ],
                        },
                    },
                ],
            },
        },
    };
    exports.loadDataSourceMetadataRequest = {
        DataSource: {
            ObjectName: "CER002~EPM_EMPLOYEES_DEMO~",
            PackageName: "ABAP",
            SchemaName: "",
        },
        Options: ["SynchronousRun"],
        Metadata: {
            Context: "Search",
            Expand: ["Cube"],
        },
        ServiceVersion: 204,
    };
});
})();