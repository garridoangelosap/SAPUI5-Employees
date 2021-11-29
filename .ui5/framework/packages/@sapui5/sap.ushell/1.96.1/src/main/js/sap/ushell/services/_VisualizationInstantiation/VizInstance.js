// Copyright (c) 2009-2021 SAP SE. All rights reserved.

sap.ui.define([
    "sap/m/ActionSheet",
    "sap/m/library",
    "sap/ui/events/PseudoEvents",
    "sap/ushell/library",
    "sap/ui/core/Control",
    "sap/m/GenericTile",
    "sap/ushell/services/_VisualizationInstantiation/VizInstanceRenderer",
    "sap/ushell/resources",
    "sap/m/VBox",
    "sap/ui/core/Icon"
], function (
    ActionSheet,
    mobileLibrary,
    PseudoEvents,
    ushellLibrary,
    Control,
    GenericTile,
    VizInstanceRenderer,
    resources,
    VBox,
    Icon) {
    "use strict";

    // shortcut for sap.m.LoadState
    var LoadState = mobileLibrary.LoadState;
    var FrameType = mobileLibrary.FrameType;
    var TileSizeBehavior = mobileLibrary.TileSizeBehavior;
    var DisplayFormat = ushellLibrary.DisplayFormat;

    /**
     * @constructor
     */
    var VizInstance = Control.extend("sap.ushell.ui.launchpad.VizInstance", /** @lends sap.ushell.ui.launchpad.VizInstance.prototype*/ {
        metadata: {
            library: "sap.ushell",
            properties: {
                title: {
                    type: "string",
                    defaultValue: "",
                    bindable: true
                },
                subtitle: {
                    type: "string",
                    defaultValue: "",
                    bindable: true
                },
                height: {
                    type: "int",
                    defaultValue: 2
                },
                width: {
                    type: "int",
                    defaultValue: 2
                },
                info: {
                    type: "string",
                    defaultValue: "",
                    bindable: true
                },
                icon: {
                    type: "sap.ui.core.URI",
                    defaultValue: "",
                    bindable: true
                },
                numberUnit: {
                    type: "string",
                    defaultValue: "",
                    bindable: true
                },
                state: {
                    type: "sap.m.LoadState",
                    defaultValue: LoadState.Loaded,
                    bindable: true
                },
                sizeBehavior: {
                    type: "sap.m.TileSizeBehavior",
                    defaultValue: TileSizeBehavior.Responsive,
                    bindable: true
                },
                editable: {
                    type: "boolean",
                    defaultValue: false,
                    bindable: true
                },
                active: {
                    type: "boolean",
                    defaultValue: false
                },
                targetURL: {
                    type: "string"
                },
                indicatorDataSource: {
                    type: "object",
                    defaultValue: undefined
                },
                dataSource: {
                    type: "object",
                    defaultValue: undefined
                },
                keywords: {
                    type: "string[]",
                    defaultValue: []
                },
                instantiationData: {
                    type: "object",
                    defaultValue: {}
                },
                contentProviderId: {
                    type: "string",
                    defaultValue: ""
                },
                vizConfig: {
                    type: "object"
                },
                supportedDisplayFormats: {
                    type: "string[]",
                    defaultValue: [DisplayFormat.Standard]
                },
                dataHelpId: {
                    type: "string",
                    defaultValue: ""
                },
                /**
                 * displayFormat
                 * type === string: If we checked for the enum type here, all typos and unknown values
                 * would fail validation instead of falling back to default.
                 */
                displayFormat: {
                    type: "string",
                    defaultValue: DisplayFormat.Standard
                },
                preview: {
                    type: "boolean",
                    defaultValue: false
                }
            },
            defaultAggregation: "tileActions",
            aggregations: {
                content: {
                    type: "sap.ui.core.Control",
                    multiple: false
                },
                tileActions: {
                    type: "sap.m.Button",
                    forwarding: {
                        getter: "_getTileActionSheet",
                        aggregation: "buttons"
                    }
                }
            },
            events: {
                press: {
                    parameters: {
                        scope: { type: "sap.m.GenericTileScope" },
                        action: { type: "string" }
                    }
                }
            }
        },
        renderer: VizInstanceRenderer
    });

    VizInstance.prototype.init = function () {
        this._oContent = new GenericTile({
            frameType: this._formatPlaceholderFrameType(this.getDisplayFormat()),
            state: this.getState()
        });

        this.setAggregation("content", this._oContent);
    };


    VizInstance.prototype.setDisplayFormat = function (sDisplayFormat) {
        this.setProperty("displayFormat", sDisplayFormat);
        this._setSize();

        if (this._oContent.isA("sap.m.GenericTile")) {
            this._oContent.setFrameType(this._formatPlaceholderFrameType(sDisplayFormat));
        }
        return this;
    };

    VizInstance.prototype.setState = function (sState) {
        this.setProperty("state", sState);

        if (this._oContent.isA("sap.m.GenericTile")) {
            this._oContent.setState(sState);
        }
        return this;
    };

    /**
     * Converts the DisplayFormat to the according FrameType.
     * @param {sap.ushell.DisplayFormat} sDisplayFormat The DisplayFormat of the VizInstance
     * @returns {sap.m.FrameType} The FrameType
     *
     * @since 1.86.0
     * @private
     */
    VizInstance.prototype._formatPlaceholderFrameType = function (sDisplayFormat) {
        this._setSize();
        switch (sDisplayFormat) {
            case DisplayFormat.Flat:
                return FrameType.OneByHalf;
            case DisplayFormat.FlatWide:
                return FrameType.TwoByHalf;
            case DisplayFormat.StandardWide:
                return FrameType.TwoByOne;
            default:
                // DisplayFormat.Standard
                return FrameType.OneByOne;
        }
    };

    VizInstance.prototype.exit = function () {
        if (this._oActionModeButtonIconVBox) {
            this._oActionModeButtonIconVBox.destroy();
        }
        if (this._oActionDivCenter) {
            this._oActionDivCenter.destroy();
        }
        if (this._oActionSheet) {
            this._oActionSheet.destroy();
        }
        if (this._oRemoveIconVBox) {
            this._oRemoveIconVBox.destroy();
        }
    };

    /**
     * Returns the layout data for the GridContainer/Section.
     *
     * @returns {object} The layout data in "columns x rows" format. E.g.: "2x2"
     * @since 1.77.0
     */
    VizInstance.prototype.getLayout = function () {
        return {
            columns: this.getWidth(),
            rows: this.getHeight()
        };
    };

    /**
     * Updates the content aggregation of the control and recalculates its layout data
     *
     * @param {sap.ui.core.Control} content The control to be put inside the visualization
     * @since 1.77.0
     */
    VizInstance.prototype._setContent = function (content) {
        var oGridData = this.getLayoutData();
        if (oGridData && oGridData.isA("sap.f.GridContainerItemLayoutData")) {
            oGridData.setRows(this.getHeight());
            oGridData.setColumns(this.getWidth());
            this.getParent().invalidate();
        }
        if (this.getDataHelpId()) {
            content.data("help-id", this.getDataHelpId(), true);
        }

        this._oContent = content;
        this.invalidate();
    };

    /**
     * Updates the internal _content aggregation with the inner content or the inner content's first child item.
     * @private
     * @since 1.81.0
     */
    VizInstance.prototype._updateContent = function () {
        var oContent = this._oContent;

        // Replace the generic tile of the control with the actual content
        if (this._oContent.getItems) {
            this.setAggregation("content", oContent.getItems()[0]);
        } else {
            this.setAggregation("content", oContent);
        }
    };

    /**
     * Returns a new ActionSheet. If it was already created it will return the instance.
     *
     * @returns {sap.m.ActionSheet} The ActionSheet control.
     */
    VizInstance.prototype._getTileActionSheet = function () {
        if (!this._oActionSheet) {
            this._oActionSheet = new ActionSheet();
        }

        return this._oActionSheet;
    };

    /**
     * Press handler for action menu icon.
     *
     * @since 1.79.0
     * @private
     */
    VizInstance.prototype._onActionMenuIconPressed = function () {
        if (this._oActionModeIcon) {
            this._getTileActionSheet().openBy(this._oActionModeIcon);
        }
    };

    VizInstance.prototype.getFocusDomRef = function () {
        if (this.getEditable()) {
            return this._oActionModeIcon && this._oActionModeIcon.getFocusDomRef();
        }

        var aPossibleControls = this._oContent.findAggregatedObjects(true, function (oControl) {
            return oControl.isA("sap.m.GenericTile") || oControl.isA("sap.f.Card");
        });

        if (aPossibleControls.length) {
            return aPossibleControls[0].getFocusDomRef();
        }

        return this._oContent.getFocusDomRef();
    };

    /**
     * Click handler. Prevents the navigation if the edit mode is active.
     *
     * @param {Event} oEvent The Event object
     * @since 1.78.0
     */
    VizInstance.prototype.onclick = function (oEvent) {
        if (this._preventDefault(oEvent)) {
            this.firePress({
                scope: "Display",
                action: "Press"
            });
        } else if (this._oRemoveIconVBox && this._oRemoveIconVBox.getDomRef().contains(oEvent.target)) {
            this.firePress({
                scope: "Actions",
                action: "Remove"
            });
        } else {
            this._onActionMenuIconPressed();
        }
    };

    VizInstance.prototype.onBeforeRendering = function () {
        this._updateContent();

        var oDomRef = this.getDomRef();
        if (oDomRef) {
            oDomRef.removeEventListener("keyup", this._fnKeyupHandler);
            oDomRef.removeEventListener("touchend", this._fnTouchendHandler);
        }
    };

    /**
     * SAPUI5 Lifecycle hook which is called after the control is rendered.
     * Prevents the navigation on keyup events while in the edit mode.
     * Event Capturing is enabled for these as we have no direct control over
     * inner elements but need to prevent their actions in the edit mode.
     *
     * @override
     * @since 1.78.0
     * @private
     */
    VizInstance.prototype.onAfterRendering = function () {
        var oDomRef = this.getDomRef();
        this._fnKeyupHandler = this.onkeyup.bind(this);
        this._fnTouchendHandler = this.onclick.bind(this);

        oDomRef.addEventListener("keyup", this._fnKeyupHandler, true);
        oDomRef.addEventListener("touchend", this._fnTouchendHandler, true);
    };

    /**
     * Handles the keyup event while edit mode is active
     * If delete or backspace is pressed, the focused VizInstance gets removes.
     * If space or enter is pressed, the navigation gets prevented.
     *
     * @param {Event} oEvent Browser Keyboard event
     * @since 1.78.0
     * @private
     */
    VizInstance.prototype.onkeyup = function (oEvent) {
        if (this.getEditable()) {
            if ((PseudoEvents.events.sapdelete.fnCheck(oEvent) || PseudoEvents.events.sapbackspace.fnCheck(oEvent))) {
                this.firePress({
                    scope: "Actions",
                    action: "Remove"
                });
            }

            if (PseudoEvents.events.sapspace.fnCheck(oEvent) || PseudoEvents.events.sapenter.fnCheck(oEvent)) {
                this._preventDefault(oEvent);
            }
        }
    };

    /**
     * Stops the given event from bubbling up or down the DOM and prevents its default behavior.
     *
     * @param {Event} oEvent The browser event
     * @returns {boolean} False if the default behavior is prevented, otherwise true.
     * @since 1.78.0
     */
    VizInstance.prototype._preventDefault = function (oEvent) {
        if (this.getEditable()) {
            oEvent.preventDefault();
            oEvent.stopPropagation();
            oEvent.stopImmediatePropagation();
            return false;
        }
        return true;
    };

    /**
     * Loads the content of the VizInstance and resolves the returned Promise
     * when loading is completed.
     * @param {boolean} [bIsCustomVizType] Should be true if the visualization is a custom one. (Only used in CDM)
     *
     * @returns {Promise<void>} Resolves when loading is completed
     * @abstract
     * @since 1.77.0
     */
    VizInstance.prototype.load = function () {
        // As this is the base control that doesn't load anything, a resolved Promise is
        // returned always.
        return Promise.resolve();
    };

    /**
     * Sets the width and the height of the vizInstance based on the display format.
     *
     * @since 1.88.0
     */
    VizInstance.prototype._setSize = function () {
        var oSize = {};
        switch (this.getDisplayFormat()) {
            case DisplayFormat.Flat:
                oSize.width = 2;
                oSize.height = 1;
                break;
            case DisplayFormat.FlatWide:
                oSize.width = 4;
                oSize.height = 1;
                break;
            case DisplayFormat.StandardWide:
                oSize.width = 4;
                oSize.height = 2;
                break;
            default:
                // DisplayFormat.Standard
                oSize.width = 2;
                oSize.height = 2;
                break;
        }

        this.setWidth(oSize.width);
        this.setHeight(oSize.height);
    };

    /**
     * Returns all display formats available after filtering out the current and non-eligible ones
     *
     * @returns {string[]} aAvailableDisplayFormats The available display formats
     *
     * @since 1.85.0
     */
    VizInstance.prototype.getAvailableDisplayFormats = function () {
        var aAvailableDisplayFormats,
            aSupportedDisplayFormats = this.getSupportedDisplayFormats(),
            sDisplayFormat = this.getDisplayFormat();

        aAvailableDisplayFormats = aSupportedDisplayFormats.filter(function (displayFormat) {
            return displayFormat !== sDisplayFormat;
        });

        var iCompactIndex = aAvailableDisplayFormats.indexOf("compact");
        var sTitle = this.getTitle();
        var sTargetURL = this.getTargetURL();

        // link is only possible if both title and target url have value
        if (iCompactIndex > -1 && (!sTitle || !sTargetURL)) {
            aAvailableDisplayFormats.splice(iCompactIndex, 1);
        }
        return aAvailableDisplayFormats;
    };

    /**
     * Instantiates and returns the VBox containing the remove icon used in the edit mode
     *
     * @since 1.93.0
     * @returns {object} The VBox containing the remove icon
     */
    VizInstance.prototype._getRemoveIconVBox = function () {
        if (!this._oRemoveIconVBox) {
            var oMBundle = sap.ui.getCore().getLibraryResourceBundle("sap.m");
            var oRemoveIcon = new Icon({
                id: this.getId() + "-action-remove",
                alt: oMBundle.getText("GENERICTILE_ACTIONS_ARIA_TEXT"),
                decorative: false,
                noTabStop: true,
                src: "sap-icon://decline",
                tooltip: resources.i18n.getText("removeButtonTitle")
            }).addStyleClass("sapUshellTileDeleteIconInnerClass sapMPointer");

            this._oRemoveIconVBox = new VBox({
                items: [oRemoveIcon]
            }).addStyleClass("sapUshellTileDeleteIconOuterClass sapUshellTileDeleteClickArea sapMPointer");
            this._oRemoveIconVBox.setParent(this);
        }

        return this._oRemoveIconVBox;
    };

    /**
     * Instantiates and returns the ActionDivCenter VBox
     *
     * @since 1.93.0
     * @returns {object} The ActionDivCenter VBox
     */
    VizInstance.prototype._getActionDivCenter = function () {
        if (!this._oActionDivCenter) {
            this._oActionDivCenter = new VBox().addStyleClass("sapUshellTileActionDivCenter");
            this._oActionDivCenter.attachBrowserEvent("click", this._onActionMenuIconPressed, this);
            this._oActionDivCenter.setParent(this);
        }
        return this._oActionDivCenter;
    };

    /**
     * Instantiates and returns the VBox containing the Icon used to access the tile options menu
     *
     * @since 1.93.0
     * @returns {object} The VBox containing the Icon used to access the tile options menu
     */
    VizInstance.prototype._getActionModeButtonIconVBox = function () {
        if (!this._oActionModeButtonIconVBox) {
            var oMBundle = sap.ui.getCore().getLibraryResourceBundle("sap.m");

            this._oActionModeIcon = new Icon({
                id: this.getId() + "-action-more",
                decorative: false,
                alt: oMBundle.getText("LIST_ITEM_NAVIGATION"),
                noTabStop: true,
                press: [ this._onActionMenuIconPressed, this ],
                src: "sap-icon://overflow",
                tooltip: resources.i18n.getText("configuration.category.tile_actions")
            }).addStyleClass("sapUshellTileActionIconDivBottomInner sapMPointer");

            this._oActionModeButtonIconVBox = new VBox({
                items: [ this._oActionModeIcon ]
            }).addStyleClass("sapUshellTileActionIconDivBottom sapMPointer");
            this._oActionModeButtonIconVBox.setParent(this);
        }

        return this._oActionModeButtonIconVBox;
    };

    return VizInstance;
});
