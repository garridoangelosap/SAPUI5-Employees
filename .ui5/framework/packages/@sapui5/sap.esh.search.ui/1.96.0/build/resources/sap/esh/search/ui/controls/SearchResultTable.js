/*!
 * ${copyright}
 */
sap.ui.define(["sap/esh/search/ui/SearchHelper", "sap/m/Table"], function (SearchHelper, Table) {
    "use strict";
    return Table.extend("sap.esh.search.ui.controls.SearchResultTable", {
        renderer: "sap.m.TableRenderer",
        onAfterRendering: function () {
            SearchHelper.attachEventHandlersForTooltip(this.getDomRef());
        },
    });
});
