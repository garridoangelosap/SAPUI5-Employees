/*!
 * SAPUI5
 * (c) Copyright 2009-2021 SAP SE. All rights reserved.
 */

sap.ui.define(["sap/ui/base/Object"], function(BaseObject) {
	"use strict";

	var InvalidAttachmentParameterException = BaseObject.extend("sap.collaboration.components.fiori.sharing.attachment.InvalidAttachmentParameterException", {
		constructor: function(parameter) {
			/** @private */ this.exceptionName = "InvalidAttachmentParameterException: " + parameter;
		}
	});


	return InvalidAttachmentParameterException;

});
