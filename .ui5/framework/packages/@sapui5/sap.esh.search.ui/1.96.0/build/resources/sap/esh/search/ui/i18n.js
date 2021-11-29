/*!
 * ${copyright}
 */
// @ts-check-disable
sap.ui.define(["sap/ui/model/resource/ResourceModel"], 
/**
 *
 * @param {*} ResourceModel
 */
function (ResourceModel) {
    ("use strict");
    var i18nModel = new ResourceModel({
        bundleName: "sap.esh.search.ui.resources.resources",
    });
    return i18nModel.getResourceBundle();
});
