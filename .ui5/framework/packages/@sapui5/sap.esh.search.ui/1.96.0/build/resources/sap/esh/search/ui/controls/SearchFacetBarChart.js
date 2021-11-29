/*!
 * ${copyright}
 */
/* global $ */
sap.ui.define([
    "../i18n",
    "sap/suite/ui/microchart/ComparisonMicroChart",
    "sap/suite/ui/microchart/ComparisonMicroChartData",
    "sap/m/ValueColor",
    "sap/ui/core/Control",
], 
/**
 *
 * @param {*} i18n
 * @param {*} ComparisonMicroChart
 * @param {*} ComparisonMicroChartData
 * @param {*} ValueColor
 * @param {*} Control
 */
function (i18n, ComparisonMicroChart, ComparisonMicroChartData, ValueColor, Control) {
    "use strict";
    return Control.extend("sap.ushell.renderers.fiori2.search.controls.SearchFacetBarChart", {
        metadata: {
            properties: {
                lastUpdated: {
                    type: "string",
                },
                aItems: {
                    type: "object",
                },
            },
            aggregations: {
                items: {
                    type: "sap.suite.ui.microchart.ComparisonMicroChartData",
                    multiple: true,
                },
            },
        },
        constructor: function (options) {
            var that = this;
            that.options = options;
            Control.prototype.constructor.apply(this);
            this.bindAggregation("items", "items", function () {
                var oComparisonMicroChartData = new ComparisonMicroChartData({
                    title: "{label}",
                    value: "{value}",
                    color: {
                        path: "selected",
                        formatter: function (val) {
                            var res = ValueColor.Good;
                            if (!val) {
                                res = ValueColor.Neutral;
                            }
                            return res;
                        },
                    },
                    displayValue: "{valueLabel}",
                    press: function (oEvent) {
                        var context = oEvent.getSource().getBindingContext();
                        var model = context.getModel();
                        var data = context.getObject();
                        var isSelected = data.selected;
                        var filterCondition = data.filterCondition;
                        if (isSelected) {
                            // deselect
                            if (that.options.oSearchFacetDialog) {
                                that.options.oSearchFacetDialog.onDetailPageSelectionChangeCharts(oEvent);
                            }
                            else {
                                model.removeFilterCondition(filterCondition, true);
                            }
                        }
                        else if (that.options.oSearchFacetDialog) {
                            // select  ie set filter, first for searchFacetDialog
                            that.options.oSearchFacetDialog.onDetailPageSelectionChangeCharts(oEvent);
                        }
                        else {
                            // select  ie set filter, without searchFacetDialog ie for small facets
                            model.addFilterCondition(filterCondition, true);
                        }
                    },
                });
                return oComparisonMicroChartData;
            });
        },
        renderer: function (oRm, oControl) {
            // render start of tile container
            oRm.write("<div");
            oRm.writeControlData(oControl);
            oRm.writeClasses();
            oRm.write(">");
            var oComparisonMicroChart = new ComparisonMicroChart({
                width: "90%",
                colorPalette: "",
                press: function () {
                    //not used
                },
                tooltip: "",
                shrinkable: true,
            });
            if (oControl.options.oSearchFacetDialog) {
                oComparisonMicroChart.setWidth("95%");
                oComparisonMicroChart.addStyleClass("sapUshellSearchFacetBarChartLarge");
            }
            else {
                oComparisonMicroChart.addStyleClass("sapUshellSearchFacetBarChart");
            }
            oComparisonMicroChart.addEventDelegate({
                onAfterRendering: function () {
                    $("#" + this.sId)
                        .has(".Good")
                        .addClass("sapUshellSearchFacetBarChartSelected");
                },
            });
            var items = oControl.getItems();
            var items2 = oControl.getAItems();
            if (items.length === 0 && items2) {
                items = items2;
            }
            var iMissingCnt = 0;
            for (var i = 0; i < items.length; ++i) {
                var item = items[i];
                if (!oControl.options.oSearchFacetDialog) {
                    if (item.mProperties && item.mProperties.value) {
                        oComparisonMicroChart.addData(item);
                    }
                    else if (item.mProperties && !item.mProperties.value) {
                        iMissingCnt++;
                    }
                }
                else {
                    oComparisonMicroChart.addData(item);
                }
            }
            oControl.iMissingCnt = iMissingCnt;
            oRm.renderControl(oComparisonMicroChart);
            // render end of tile container
            oRm.write("</div>");
        },
        onAfterRendering: function () {
            var that = this;
            var infoZeile = $(this.getDomRef())
                .closest(".sapUshellSearchFacetIconTabBar")
                .find(".sapUshellSearchFacetInfoZeile")[0];
            var oInfoZeile = sap.ui.getCore().byId(infoZeile.id);
            if (that.iMissingCnt > 0) {
                oInfoZeile.setVisible(true);
                var message = i18n.getText("infoZeileNumberMoreSelected", [that.iMissingCnt]);
                oInfoZeile.setText(message);
                oInfoZeile.rerender();
            }
            else {
                oInfoZeile.setVisible(false);
            }
            // change tooltip by adding ":"
            var aAllBarchartTooltips = $(".sapSuiteUiMicroChartPointer");
            for (var i = 0; i < aAllBarchartTooltips.length; i++) {
                var tt = aAllBarchartTooltips[i];
                var s = tt.title;
                if (s && s.indexOf(":") === -1) {
                    tt.title = s.replace(/( \d+) *$/, ":$1");
                }
            }
        },
        setEshRole: function () { },
    });
});
