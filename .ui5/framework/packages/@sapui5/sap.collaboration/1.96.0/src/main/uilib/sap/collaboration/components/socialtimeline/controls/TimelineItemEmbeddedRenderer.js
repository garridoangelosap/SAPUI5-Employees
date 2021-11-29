/*
* ! SAPUI5
 * (c) Copyright 2009-2021 SAP SE. All rights reserved.
*/
sap.ui.define([],
	function(){
	"use strict";

	/**
	 * TimelineItemEmbedded renderer.
	 * @namespace
	 */
	var TimelineItemEmbedded = {};
	/**
	 * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
	 * @protected
	 * @param {sap.ui.core.RenderManager} oRM the RenderManager that can be used for writing to the render output buffer.
	 * @param {sap.ui.core.Control} oControl an object representation of the control that should be rendered.
	 */
	TimelineItemEmbedded.render = function(oRm, oControl) {
		oRm.renderControl(oControl.getEmbeddedControl());
	};

	return TimelineItemEmbedded;
}, /* bExport= */ true);