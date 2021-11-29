// Copyright (c) 2009-2021 SAP SE. All rights reserved.

sap.ui.define([], function () {
    "use strict";

    function AppStatePersistencySettings (sCreatorUserID, aSelectedUserIDs, aRetrievalMapping, tsExpiration) {
        this.CreatorUserID = sCreatorUserID;
        this.SelectedUserIDs = aSelectedUserIDs; //array of Strings
        this.RetrievalMapping = aRetrievalMapping; //array of Objects
        this.Expiration = tsExpiration; //timestamp
    }

    return AppStatePersistencySettings;
});
