/*!
 * SAPUI5
 * (c) Copyright 2009-2021 SAP SE. All rights reserved.
 */

// Provides type sap.ui.vk.SelectionMode.
sap.ui.define([], function() {
	"use strict";

	/**
	 * SelectionMode options.
	 * @enum {string}
	 * @readonly
	 * @alias sap.ui.vk.SelectionMode
	 * @public
	 */
	var SelectionMode = {
		None: "none",
		Exclusive: "exclusive",
		Sticky: "sticky"
	};


	return SelectionMode;

}, /* bExport= */ true);
