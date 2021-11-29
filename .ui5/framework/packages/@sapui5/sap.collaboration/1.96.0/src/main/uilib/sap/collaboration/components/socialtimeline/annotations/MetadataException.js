/*!
 * SAPUI5
 * (c) Copyright 2009-2021 SAP SE. All rights reserved.
 */
sap.ui.define(['sap/ui/base/Object'],
	function(BaseObject) {
	"use strict";

	var MetadataException = BaseObject.extend("sap.collaboration.components.socialtimeline.annotations.MetadataException", {
		constructor: function(sExceptionMessage) {
			this._sClassName = "sap.collaboration.components.socialtimeline.annotations.MetadataException";
			this._sExceptionMessage = sExceptionMessage;
		}
	});

	return MetadataException;

});
