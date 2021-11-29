/*!
 * ${copyright}
 */
sap.ui.define(["sap/esh/search/ui/controls/twitter/TwitterRenderer"], function (twitterRenderer) {
    "use strict";
    return sap.ui.core.Control.extend("sap.esh.search.ui.controls.twitter.SearchTweet", {
        metadata: {
            properties: {
                text: "string",
            },
        },
        renderer: function (oRm, oControl) {
            oRm.write("<div");
            oRm.writeControlData(oControl);
            oRm.writeClasses();
            oRm.write(">");
            twitterRenderer.renderTweet(oRm, oControl.getText());
            oRm.write("</div>");
        },
    });
});
