/*!
* SAPUI5
 * (c) Copyright 2009-2021 SAP SE. All rights reserved.
*/

sap.ui.define(function() {
	"use strict";

	/**
	* Viewport renderer.
	* @namespace
	*/
	var ViewportRenderer = {};

	ViewportRenderer.render = function(rm, control) {
		rm.write("<div");
		rm.writeControlData(control);
		rm.writeAttribute("tabindex", 0);
		rm.writeAttribute("role", "figure");
		rm.addStyle("width", control.getWidth());
		rm.addStyle("height", control.getHeight());
		rm.writeStyles();
		rm.addClass("sapUiVbmViewport");
		rm.writeClasses();
		rm.write(">");
		rm.write("</div>");
	};

	return ViewportRenderer;

}, true);
