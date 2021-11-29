/*!
 * ${copyright}
 */
(function () {
    "use strict";
    sap.ui.define(["sap/esh/search/ui/SearchFacetDialogHelper", "sap/esh/search/ui/controls/SearchAdvancedCondition"], function (SearchFacetDialogHelper, SearchAdvancedCondition) {
        SearchFacetDialogHelper.setSearchAdvancedCondition(SearchAdvancedCondition);
        SearchAdvancedCondition.setSearchFacetDialogHelper(SearchFacetDialogHelper);
    });
})(window);
