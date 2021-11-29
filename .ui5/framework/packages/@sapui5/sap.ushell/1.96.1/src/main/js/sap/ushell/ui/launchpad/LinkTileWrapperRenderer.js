// Copyright (c) 2009-2021 SAP SE. All rights reserved.

sap.ui.define([
    "sap/base/Log",
    "sap/m/GenericTile",
    "sap/m/library",
    "sap/ushell/resources"
], function (
    Log,
    GenericTile,
    mobileLibrary,
    ushellResources
) {
    "use strict";

    // shortcut for sap.m.GenericTileMode
    var GenericTileMode = mobileLibrary.GenericTileMode;

    // shortcut for sap.m.LoadState
    var LoadState = mobileLibrary.LoadState;

    /**
     * @name LinkTileWrapper renderer.
     * @static
     * @private
     */
    var LinkTileWrapperRenderer = {};

    /**
     * Renders the HTML for the given control, using the provided
     * {@link sap.ui.core.RenderManager}.
     *
     * @param {sap.ui.core.RenderManager}
     *            oRm the RenderManager that can be used for writing to the render
     *            output buffer
     * @param {sap.ui.core.Control}
     *            oControl an object representation of the control that should be
     *            rendered
     */
    LinkTileWrapperRenderer.render = function (oRm, oControl) {
        var oTileView = null;
        var oModel = oControl.getModel();

        function tileLoadingFailed () {
            oTileView = new GenericTile({
                header: ushellResources.i18n.getText("cannotLoadTile"),
                mode: GenericTileMode.LineMode,
                state: LoadState.Failed
            });
        }

        try {
            oTileView = oControl.getTileViews()[0];
        } catch (ex) {
            Log.warning("Failed to load tile view: ", ex.message);
            tileLoadingFailed();
        }

        if (!oTileView) {
            Log.warning("Failed to load tile view: the control has no tileViews");
            tileLoadingFailed();
        }

        oRm.write("<div");

        // if xRay is enabled
        if (oModel && oModel.getProperty("/enableHelp")) {
            // currently only the Tile (and the Tile's footer) has a data attribute in teh xRay integration
            // (as using this value as a class value instead as done in all of the static elements causes parsing errors in the xRay hotspot definition flow)
            oRm.writeAttribute("data-help-id", oControl.getTileCatalogId());// xRay support
        }
        oRm.writeControlData(oControl);
        oRm.addClass("sapUshellLinkTile");
        if (!oControl.getVisible()) {
            oRm.addClass("sapUshellHidden");
        }
        //TODO:Check this
        if (oControl.getIsLocked()) {
            oRm.addClass("sapUshellLockedTile");
        }
        oRm.writeClasses();
        oRm.writeAttributeEscaped("tabindex", "-1");

        oRm.write(">");

        oRm.renderControl(oTileView);

        oRm.write("</div>");
    };

    return LinkTileWrapperRenderer;
}, /*bExport=*/true);
