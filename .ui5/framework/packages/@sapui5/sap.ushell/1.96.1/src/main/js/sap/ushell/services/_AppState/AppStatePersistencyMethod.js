// Copyright (c) 2009-2021 SAP SE. All rights reserved.

sap.ui.define([], function () {
    "use strict";

    function AppStatePersistencyMethod () {
        this.PersonalState = "PersonalState";
        this.ACLProtectedState = "ACLProtectedState";
        this.PublicState = "PublicState";
        this.AuthorizationProtectedState = "AuthorizationProtectedState";
    }

    return new AppStatePersistencyMethod();
});
