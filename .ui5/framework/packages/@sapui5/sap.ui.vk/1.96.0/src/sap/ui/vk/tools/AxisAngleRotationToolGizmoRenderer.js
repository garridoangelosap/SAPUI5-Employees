/*!
 * SAPUI5
 * (c) Copyright 2009-2021 SAP SE. All rights reserved.
 */

sap.ui.define([
], function() {
	"use strict";

	/**
	 * AxisAngleRotationToolGizmoRenderer renderer.
	 * @namespace
	 */
	var AxisAngleRotationToolGizmoRenderer = {};

	/**
	 * Renders the HTML for the given control, using the provided
	 * {@link sap.ui.core.RenderManager}.
	 *
	 * @param {sap.ui.core.RenderManager} rm
	 *            the RenderManager that can be used for writing to
	 *            the Render-Output-Buffer
	 * @param {sap.ui.core.Control} control
	 *            the control to be rendered
	 */
	AxisAngleRotationToolGizmoRenderer.render = function(rm, control) {
		rm.write("<div");
		rm.writeControlData(control);
		rm.addClass("sapUiVkTransformationToolEdit");
		rm.writeClasses();
		rm.write(">");
		rm.renderControl(control._editingForm);
		rm.write("</div>");
	};

	return AxisAngleRotationToolGizmoRenderer;

}, /* bExport= */ true);
