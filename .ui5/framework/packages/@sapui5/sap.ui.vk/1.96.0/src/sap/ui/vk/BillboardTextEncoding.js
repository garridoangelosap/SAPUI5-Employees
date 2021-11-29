/*!
 * SAPUI5
 * (c) Copyright 2009-2021 SAP SE. All rights reserved.
 */

// Provides type sap.ui.vk.BillboardTextEncoding.
sap.ui.define([], function() {
	"use strict";

	/**
	 * Billboard text encoding for {@link sap.ui.vk.threejs.Billboard}.
	 * @enum {string}
	 * @readonly
	 * @alias sap.ui.vk.BillboardTextEncoding
	 * @private
	 */
	var BillboardTextEncoding = {
		PlainText: "PlainText",
		HtmlText: "HtmlText"
	};

	return BillboardTextEncoding;

}, /* bExport= */ true);
