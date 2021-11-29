/*!
 * SAPUI5
 * (c) Copyright 2009-2021 SAP SE. All rights reserved.
 */

// Provides type sap.ui.vk.tools.GizmoPlacementMode.
sap.ui.define([], function() {
	"use strict";

	/**
	 * Sets the placement mode for move tool.
	 * @enum {string}
	 * @readonly
	 * @alias sap.ui.vk.tools.GizmoPlacementMode
	 * @public
	 */
	var GizmoPlacementMode = {
		/**
		 * Default PlacementMode
		 * @public
		 */
		Default: "Default",
		/**
		 * Object center PlacementMode
		 * @public
		 */
		ObjectCenter: "ObjectCenter",
		/**
		 * On screen PlacementMode
		 * @public
		 */
		OnScreen: "OnScreen",
		/**
		 * Rest position PlacementMode
		 * @public
		 */
		Rest: "Rest"
	};

	return GizmoPlacementMode;

}, /* bExport= */ true);
