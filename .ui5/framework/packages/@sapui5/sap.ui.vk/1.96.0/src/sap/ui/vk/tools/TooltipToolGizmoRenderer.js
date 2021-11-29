/*!
 * SAPUI5
 * (c) Copyright 2009-2021 SAP SE. All rights reserved.
 */

sap.ui.define([
], function() {
	"use strict";

	/**
	 * TooltipToolGizmoRenderer renderer.
	 * @namespace
	 */
	var TooltipToolGizmoRenderer = {};

	/**
	 * Renders the HTML for the given control, using the provided
	 * {@link sap.ui.core.RenderManager}.
	 *
	 * @param {sap.ui.core.RenderManager} oRm
	 *            the RenderManager that can be used for writing to
	 *            the Render-Output-Buffer
	 * @param {sap.ui.core.Control} oControl
	 *            the control to be rendered
	 */
	TooltipToolGizmoRenderer.render = function(oRm, oControl) {

		oRm.write("<div");
		oRm.writeControlData(oControl);
		oRm.addClass("sapUiVizKitTooltip");
		if (oControl.getParent().getAnimate()) {
			oRm.addClass("sapUiVizKitTooltipAnimation");
		}
		oRm.writeClasses();
		oRm.write(">");
		oRm.write("</div>");

	};

	return TooltipToolGizmoRenderer;

}, /* bExport= */ true);
