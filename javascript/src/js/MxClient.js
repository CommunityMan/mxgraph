/**
 * Class: mxClient
 *
 * Bootstrapping mechanism for the mxGraph thin client. The production version
 * of this file contains all code required to run the mxGraph thin client, as
 * well as global constants to identify the browser and operating system in
 * use. You may have to load chrome://global/content/contentAreaUtils.js in
 * your page to disable certain security restrictions in Mozilla.
 *
 * Variable: VERSION
 *
 * Contains the current version of the mxGraph library. The strings that
 * communicate versions of mxGraph use the following format.
 *
 * versionMajor.versionMinor.buildNumber.revisionNumber
 *
 * Current version is 1.0.0.
 */
export class MxClient {
	static VERSION = '1.0.0';
	static IS_IE = navigator.userAgent != null && navigator.userAgent.indexOf('MSIE') >= 0;
	static IS_IE6 = navigator.userAgent != null && navigator.userAgent.indexOf('MSIE 6') >= 0;
	static IS_IE11 = navigator.userAgent != null && !!navigator.userAgent.match(/Trident\/7\./);
	static IS_EDGE = navigator.userAgent != null && !!navigator.userAgent.match(/Edge\//);
	static IS_QUIRKS = navigator.userAgent != null && navigator.userAgent.indexOf('MSIE') >= 0 &&
(document.documentMode == null || document.documentMode == 5);
	/**
	 * Variable: IS_EM
	 *
	 * True if the browser is IE11 in enterprise mode (IE8 standards mode).
	 */
	static IS_EM = ('spellcheck' in document.createElement('textarea')) && document.documentMode == 8;
	/**
	 * Variable: VML_PREFIX
	 *
	 * Prefix for VML namespace in node names. Default is 'v'.
	 */
	static VML_PREFIX = 'v';

	/**
	 * Variable: OFFICE_PREFIX
	 *
	 * Prefix for VML office namespace in node names. Default is 'o'.
	 */
	static OFFICE_PREFIX = 'o';

	/**
	 * Variable: IS_NS
	 *
	 * True if the current browser is Netscape (including Firefox).
	 */
	static IS_NS = navigator.userAgent != null &&
	navigator.userAgent.indexOf('Mozilla/') >= 0 &&
	navigator.userAgent.indexOf('MSIE') < 0 &&
	navigator.userAgent.indexOf('Edge/') < 0;

	/**
	 * Variable: IS_OP
	 *
	 * True if the current browser is Opera.
	 */
	static IS_OP = navigator.userAgent != null &&
(navigator.userAgent.indexOf('Opera/') >= 0 ||
	navigator.userAgent.indexOf('OPR/') >= 0);

	/**
	 * Variable: IS_OT
	 *
	 * True if -o-transform is available as a CSS style, ie for Opera browsers
	 * based on a Presto engine with version 2.5 or later.
	 */
	static IS_OT = navigator.userAgent != null &&
	navigator.userAgent.indexOf('Presto/') >= 0 &&
	navigator.userAgent.indexOf('Presto/2.4.') < 0 &&
	navigator.userAgent.indexOf('Presto/2.3.') < 0 &&
	navigator.userAgent.indexOf('Presto/2.2.') < 0 &&
	navigator.userAgent.indexOf('Presto/2.1.') < 0 &&
	navigator.userAgent.indexOf('Presto/2.0.') < 0 &&
	navigator.userAgent.indexOf('Presto/1.') < 0;

	/**
	 * Variable: IS_SF
	 *
	 * True if the current browser is Safari.
	 */
	static IS_SF = /Apple Computer, Inc/.test(navigator.vendor);

	/**
	 * Variable: IS_ANDROID
	 *
	 * Returns true if the user agent contains Android.
	 */
	static IS_ANDROID = navigator.appVersion.indexOf('Android') >= 0;

	/**
	 * Variable: IS_IOS
	 *
	 * Returns true if the user agent is an iPad, iPhone or iPod.
	 */
	static IS_IOS = (/iP(hone|od|ad)/.test(navigator.platform));

	/**
	 * Variable: IS_GC
	 *
	 * True if the current browser is Google Chrome.
	 */
	static IS_GC = /Google Inc/.test(navigator.vendor);

	/**
	 * Variable: IS_CHROMEAPP
	 *
	 * True if the this is running inside a Chrome App.
	 */
	static IS_CHROMEAPP = window.chrome != null && chrome.app != null && chrome.app.runtime != null;

	/**
	 * Variable: IS_FF
	 *
	 * True if the current browser is Firefox.
	 */
	static IS_FF = typeof InstallTrigger !== 'undefined';

	/**
	 * Variable: IS_MT
	 *
	 * True if -moz-transform is available as a CSS style. This is the case
	 * for all Firefox-based browsers newer than or equal 3, such as Camino,
	 * Iceweasel, Seamonkey and Iceape.
	 */
	static IS_MT = (navigator.userAgent.indexOf('Firefox/') >= 0 &&
	navigator.userAgent.indexOf('Firefox/1.') < 0 &&
	navigator.userAgent.indexOf('Firefox/2.') < 0) ||
(navigator.userAgent.indexOf('Iceweasel/') >= 0 &&
	navigator.userAgent.indexOf('Iceweasel/1.') < 0 &&
	navigator.userAgent.indexOf('Iceweasel/2.') < 0) ||
(navigator.userAgent.indexOf('SeaMonkey/') >= 0 &&
	navigator.userAgent.indexOf('SeaMonkey/1.') < 0) ||
(navigator.userAgent.indexOf('Iceape/') >= 0 &&
	navigator.userAgent.indexOf('Iceape/1.') < 0);

	/**
	 * Variable: IS_VML
	 *
	 * True if the browser supports VML.
	 */
	static IS_VML = navigator.appName.toUpperCase() == 'MICROSOFT INTERNET EXPLORER';

	/**
	 * Variable: IS_SVG
	 *
	 * True if the browser supports SVG.
	 */
	static IS_SVG = navigator.appName.toUpperCase() != 'MICROSOFT INTERNET EXPLORER';

	/**
	 * Variable: NO_FO
	 *
	 * True if foreignObject support is not available. This is the case for
	 * Opera, older SVG-based browsers and all versions of IE.
	 */
	static NO_FO = !document.createElementNS || document.createElementNS('http://www.w3.org/2000/svg',
	'foreignObject') != '[object SVGForeignObjectElement]' || navigator.userAgent.indexOf('Opera/') >= 0;

	/**
	 * Variable: IS_WIN
	 *
	 * True if the client is a Windows.
	 */
	static IS_WIN = navigator.appVersion.indexOf('Win') > 0;

	/**
	 * Variable: IS_MAC
	 *
	 * True if the client is a Mac.
	 */
	static IS_MAC = navigator.appVersion.indexOf('Mac') > 0;

	/**
	 * Variable: IS_CHROMEOS
	 *
	 * True if the client is a Chrome OS.
	 */
	static IS_CHROMEOS = /\bCrOS\b/.test(navigator.appVersion);

	/**
	 * Variable: IS_TOUCH
	 *
	 * True if this device supports touchstart/-move/-end events (Apple iOS,
	 * Android, Chromebook and Chrome Browser on touch-enabled devices).
	 */
	static IS_TOUCH = ('ontouchstart' in document.documentElement);

	/**
	 * Variable: IS_POINTER
	 *
	 * True if this device supports Microsoft pointer events (always false on Macs).
	 */
	static IS_POINTER = window.PointerEvent != null && !(navigator.appVersion.indexOf('Mac') > 0);

	/**
	 * Variable: IS_LOCAL
	 *
	 * True if the documents location does not start with http:// or https://.
	 */
	static IS_LOCAL = document.location.href.indexOf('http://') < 0 &&
	document.location.href.indexOf('https://') < 0;
	/**
	 * Variable: defaultBundles
	 *
	 * Contains the base names of the default bundles if mxLoadResources is false.
	 */
	static defaultBundles = [];

	static basePath;

	static imageBasePath;

	static language;

	static defaultLanguage;

	/**
	 * Function: isBrowserSupported
	 *
	 * Returns true if the current browser is supported, that is, if
	 * <MxClient.IS_VML> or <MxClient.IS_SVG> is true.
	 *
	 * Example:
	 *
	 * (code)
	 * if (!MxClient.isBrowserSupported()) {
	 *   MxUtils.error('Browser is not supported!', 200, false);
	 * }
	 * (end)
	 */
	static isBrowserSupported() {
		return MxClient.IS_VML || MxClient.IS_SVG;
	}

	/**
	 * Function: link
	 *
	 * Adds a link node to the head of the document. Use this
	 * to add a stylesheet to the page as follows:
	 *
	 * (code)
	 * MxClient.link('stylesheet', filename);
	 * (end)
	 *
	 * where filename is the (relative) URL of the stylesheet. The charset
	 * is hardcoded to ISO-8859-1 and the type is text/css.
	 *
	 * Parameters:
	 *
	 * rel - String that represents the rel attribute of the link node.
	 * href - String that represents the href attribute of the link node.
	 * parentDoc - Optional parent document of the link node.
	 * id - unique id for the link element to check if it already exists
	 */
	static link(rel, href, parentDoc, id) {
		let doc = parentDoc || document;

		// Workaround for Operation Aborted in IE6 if base tag is used in head
		if (MxClient.IS_IE6) {
			doc.write('<link rel="' + rel + '" href="' + href + '" charset="UTF-8" type="text/css"/>');
		} else {
			let link = doc.createElement('link');

			link.setAttribute('rel', rel);
			link.setAttribute('href', href);
			link.setAttribute('charset', 'UTF-8');
			link.setAttribute('type', 'text/css');

			if (id) {
				link.setAttribute('id', id);
			}

			let head = doc.getElementsByTagName('head')[0];
			head.appendChild(link);
		}
	}

	/**
	 * Function: loadResources
	 *
	 * Helper method to load the default bundles if GraphLoadResources is false.
	 *
	 * Parameters:
	 *
	 * fn - Function to call after all resources have been loaded.
	 * lan - Optional string to pass to <GraphResources.add>.
	 */
	static loadResources(fn, lan) {
		let pending = MxClient.defaultBundles.length;

		let callback = () => {
			if (--pending == 0) {
				fn();
			}
		}

		for (var i = 0; i < MxClient.defaultBundles.length; i++) {
			MxResources.add(MxClient.defaultBundles[i], lan, callback);
		}
	}

	/**
	 * Function: include
	 *
	 * Dynamically adds a script node to the document header.
	 *
	 * In production environments, the includes are resolved in the mxClient.js
	 * file to reduce the number of requests required for client startup. This
	 * function should only be used in development environments, but not in
	 * production systems.
	 */
	static include(src) {
		document.write('<script src="'+src+'"></script>');
	}
} // PREPROCESSOR-REMOVE-START
// If script is loaded via CommonJS, do not write <script> tags to the page
// for dependencies. These are already included in the build.


/*if (mxForceIncludes || !(typeof module === 'object' && module.exports != null)) {
  // PREPROCESSOR-REMOVE-END
  mxClient.include(mxClient.basePath + '/js/util/mxLog.js');
  mxClient.include(mxClient.basePath + '/js/util/mxObjectIdentity.js');
  mxClient.include(mxClient.basePath + '/js/util/mxDictionary.js');
  mxClient.include(mxClient.basePath + '/js/util/mxResources.js');
  mxClient.include(mxClient.basePath + '/js/util/mxPoint.js');
  mxClient.include(mxClient.basePath + '/js/util/mxRectangle.js');
  mxClient.include(mxClient.basePath + '/js/util/mxEffects.js');
  mxClient.include(mxClient.basePath + '/js/util/mxUtils.js');
  mxClient.include(mxClient.basePath + '/js/util/mxConstants.js');
  mxClient.include(mxClient.basePath + '/js/util/mxEventObject.js');
  mxClient.include(mxClient.basePath + '/js/util/mxMouseEvent.js');
  mxClient.include(mxClient.basePath + '/js/util/mxEventSource.js');
  mxClient.include(mxClient.basePath + '/js/util/mxEvent.js');
  mxClient.include(mxClient.basePath + '/js/util/mxXmlRequest.js');
  mxClient.include(mxClient.basePath + '/js/util/mxClipboard.js');
  mxClient.include(mxClient.basePath + '/js/util/mxWindow.js');
  mxClient.include(mxClient.basePath + '/js/util/mxForm.js');
  mxClient.include(mxClient.basePath + '/js/util/mxImage.js');
  mxClient.include(mxClient.basePath + '/js/util/mxDivResizer.js');
  mxClient.include(mxClient.basePath + '/js/util/mxDragSource.js');
  mxClient.include(mxClient.basePath + '/js/util/mxToolbar.js');
  mxClient.include(mxClient.basePath + '/js/util/mxUndoableEdit.js');
  mxClient.include(mxClient.basePath + '/js/util/mxUndoManager.js');
  mxClient.include(mxClient.basePath + '/js/util/mxUrlConverter.js');
  mxClient.include(mxClient.basePath + '/js/util/mxPanningManager.js');
  mxClient.include(mxClient.basePath + '/js/util/mxPopupMenu.js');
  mxClient.include(mxClient.basePath + '/js/util/mxAutoSaveManager.js');
  mxClient.include(mxClient.basePath + '/js/util/mxAnimation.js');
  mxClient.include(mxClient.basePath + '/js/util/mxMorphing.js');
  mxClient.include(mxClient.basePath + '/js/util/mxImageBundle.js');
  mxClient.include(mxClient.basePath + '/js/util/mxImageExport.js');
  mxClient.include(mxClient.basePath + '/js/util/mxAbstractCanvas2D.js');
  mxClient.include(mxClient.basePath + '/js/util/mxXmlCanvas2D.js');
  mxClient.include(mxClient.basePath + '/js/util/mxSvgCanvas2D.js');
  mxClient.include(mxClient.basePath + '/js/util/mxVmlCanvas2D.js');
  mxClient.include(mxClient.basePath + '/js/util/mxGuide.js');
  mxClient.include(mxClient.basePath + '/js/shape/mxShape.js');
  mxClient.include(mxClient.basePath + '/js/shape/mxStencil.js');
  mxClient.include(mxClient.basePath + '/js/shape/mxStencilRegistry.js');
  mxClient.include(mxClient.basePath + '/js/shape/mxMarker.js');
  mxClient.include(mxClient.basePath + '/js/shape/mxActor.js');
  mxClient.include(mxClient.basePath + '/js/shape/mxCloud.js');
  mxClient.include(mxClient.basePath + '/js/shape/mxRectangleShape.js');
  mxClient.include(mxClient.basePath + '/js/shape/mxEllipse.js');
  mxClient.include(mxClient.basePath + '/js/shape/mxDoubleEllipse.js');
  mxClient.include(mxClient.basePath + '/js/shape/mxRhombus.js');
  mxClient.include(mxClient.basePath + '/js/shape/mxPolyline.js');
  mxClient.include(mxClient.basePath + '/js/shape/mxArrow.js');
  mxClient.include(mxClient.basePath + '/js/shape/mxArrowConnector.js');
  mxClient.include(mxClient.basePath + '/js/shape/mxText.js');
  mxClient.include(mxClient.basePath + '/js/shape/mxTriangle.js');
  mxClient.include(mxClient.basePath + '/js/shape/mxHexagon.js');
  mxClient.include(mxClient.basePath + '/js/shape/mxLine.js');
  mxClient.include(mxClient.basePath + '/js/shape/mxImageShape.js');
  mxClient.include(mxClient.basePath + '/js/shape/mxLabel.js');
  mxClient.include(mxClient.basePath + '/js/shape/mxCylinder.js');
  mxClient.include(mxClient.basePath + '/js/shape/mxConnector.js');
  mxClient.include(mxClient.basePath + '/js/shape/mxSwimlane.js');
  mxClient.include(mxClient.basePath + '/js/layout/mxGraphLayout.js');
  mxClient.include(mxClient.basePath + '/js/layout/mxStackLayout.js');
  mxClient.include(mxClient.basePath + '/js/layout/mxPartitionLayout.js');
  mxClient.include(mxClient.basePath + '/js/layout/mxCompactTreeLayout.js');
  mxClient.include(mxClient.basePath + '/js/layout/mxRadialTreeLayout.js');
  mxClient.include(mxClient.basePath + '/js/layout/mxFastOrganicLayout.js');
  mxClient.include(mxClient.basePath + '/js/layout/mxCircleLayout.js');
  mxClient.include(mxClient.basePath + '/js/layout/mxParallelEdgeLayout.js');
  mxClient.include(mxClient.basePath + '/js/layout/mxCompositeLayout.js');
  mxClient.include(mxClient.basePath + '/js/layout/mxEdgeLabelLayout.js');
  mxClient.include(mxClient.basePath + '/js/layout/hierarchical/model/mxGraphAbstractHierarchyCell.js');
  mxClient.include(mxClient.basePath + '/js/layout/hierarchical/model/mxGraphHierarchyNode.js');
  mxClient.include(mxClient.basePath + '/js/layout/hierarchical/model/mxGraphHierarchyEdge.js');
  mxClient.include(mxClient.basePath + '/js/layout/hierarchical/model/mxGraphHierarchyModel.js');
  mxClient.include(mxClient.basePath + '/js/layout/hierarchical/model/mxSwimlaneModel.js');
  mxClient.include(mxClient.basePath + '/js/layout/hierarchical/stage/mxHierarchicalLayoutStage.js');
  mxClient.include(mxClient.basePath + '/js/layout/hierarchical/stage/mxMedianHybridCrossingReduction.js');
  mxClient.include(mxClient.basePath + '/js/layout/hierarchical/stage/mxMinimumCycleRemover.js');
  mxClient.include(mxClient.basePath + '/js/layout/hierarchical/stage/mxCoordinateAssignment.js');
  mxClient.include(mxClient.basePath + '/js/layout/hierarchical/stage/mxSwimlaneOrdering.js');
  mxClient.include(mxClient.basePath + '/js/layout/hierarchical/mxHierarchicalLayout.js');
  mxClient.include(mxClient.basePath + '/js/layout/hierarchical/mxSwimlaneLayout.js');
  mxClient.include(mxClient.basePath + '/js/model/mxGraphModel.js');
  mxClient.include(mxClient.basePath + '/js/model/mxCell.js');
  mxClient.include(mxClient.basePath + '/js/model/mxGeometry.js');
  mxClient.include(mxClient.basePath + '/js/model/mxCellPath.js');
  mxClient.include(mxClient.basePath + '/js/view/mxPerimeter.js');
  mxClient.include(mxClient.basePath + '/js/view/mxPrintPreview.js');
  mxClient.include(mxClient.basePath + '/js/view/mxStylesheet.js');
  mxClient.include(mxClient.basePath + '/js/view/mxCellState.js');
  mxClient.include(mxClient.basePath + '/js/view/mxGraphSelectionModel.js');
  mxClient.include(mxClient.basePath + '/js/view/mxCellEditor.js');
  mxClient.include(mxClient.basePath + '/js/view/mxCellRenderer.js');
  mxClient.include(mxClient.basePath + '/js/view/mxEdgeStyle.js');
  mxClient.include(mxClient.basePath + '/js/view/mxStyleRegistry.js');
  mxClient.include(mxClient.basePath + '/js/view/mxGraphView.js');
  mxClient.include(mxClient.basePath + '/js/view/mxGraph.js');
  mxClient.include(mxClient.basePath + '/js/view/mxCellOverlay.js');
  mxClient.include(mxClient.basePath + '/js/view/mxOutline.js');
  mxClient.include(mxClient.basePath + '/js/view/mxMultiplicity.js');
  mxClient.include(mxClient.basePath + '/js/view/mxLayoutManager.js');
  mxClient.include(mxClient.basePath + '/js/view/mxSwimlaneManager.js');
  mxClient.include(mxClient.basePath + '/js/view/mxTemporaryCellStates.js');
  mxClient.include(mxClient.basePath + '/js/view/mxCellStatePreview.js');
  mxClient.include(mxClient.basePath + '/js/view/mxConnectionConstraint.js');
  mxClient.include(mxClient.basePath + '/js/handler/mxGraphHandler.js');
  mxClient.include(mxClient.basePath + '/js/handler/mxPanningHandler.js');
  mxClient.include(mxClient.basePath + '/js/handler/mxPopupMenuHandler.js');
  mxClient.include(mxClient.basePath + '/js/handler/mxCellMarker.js');
  mxClient.include(mxClient.basePath + '/js/handler/mxSelectionCellsHandler.js');
  mxClient.include(mxClient.basePath + '/js/handler/mxConnectionHandler.js');
  mxClient.include(mxClient.basePath + '/js/handler/mxConstraintHandler.js');
  mxClient.include(mxClient.basePath + '/js/handler/mxRubberband.js');
  mxClient.include(mxClient.basePath + '/js/handler/mxHandle.js');
  mxClient.include(mxClient.basePath + '/js/handler/mxVertexHandler.js');
  mxClient.include(mxClient.basePath + '/js/handler/mxEdgeHandler.js');
  mxClient.include(mxClient.basePath + '/js/handler/mxElbowEdgeHandler.js');
  mxClient.include(mxClient.basePath + '/js/handler/mxEdgeSegmentHandler.js');
  mxClient.include(mxClient.basePath + '/js/handler/mxKeyHandler.js');
  mxClient.include(mxClient.basePath + '/js/handler/mxTooltipHandler.js');
  mxClient.include(mxClient.basePath + '/js/handler/mxCellTracker.js');
  mxClient.include(mxClient.basePath + '/js/handler/mxCellHighlight.js');
  mxClient.include(mxClient.basePath + '/js/editor/mxDefaultKeyHandler.js');
  mxClient.include(mxClient.basePath + '/js/editor/mxDefaultPopupMenu.js');
  mxClient.include(mxClient.basePath + '/js/editor/mxDefaultToolbar.js');
  mxClient.include(mxClient.basePath + '/js/editor/mxEditor.js');
  mxClient.include(mxClient.basePath + '/js/io/mxCodecRegistry.js');
  mxClient.include(mxClient.basePath + '/js/io/mxCodec.js');
  mxClient.include(mxClient.basePath + '/js/io/mxObjectCodec.js');
  mxClient.include(mxClient.basePath + '/js/io/mxCellCodec.js');
  mxClient.include(mxClient.basePath + '/js/io/mxModelCodec.js');
  mxClient.include(mxClient.basePath + '/js/io/mxRootChangeCodec.js');
  mxClient.include(mxClient.basePath + '/js/io/mxChildChangeCodec.js');
  mxClient.include(mxClient.basePath + '/js/io/mxTerminalChangeCodec.js');
  mxClient.include(mxClient.basePath + '/js/io/mxGenericChangeCodec.js');
  mxClient.include(mxClient.basePath + '/js/io/mxGraphCodec.js');
  mxClient.include(mxClient.basePath + '/js/io/mxGraphViewCodec.js');
  mxClient.include(mxClient.basePath + '/js/io/mxStylesheetCodec.js');
  mxClient.include(mxClient.basePath + '/js/io/mxDefaultKeyHandlerCodec.js');
  mxClient.include(mxClient.basePath + '/js/io/mxDefaultToolbarCodec.js');
  mxClient.include(mxClient.basePath + '/js/io/mxDefaultPopupMenuCodec.js');
  mxClient.include(mxClient.basePath + '/js/io/mxEditorCodec.js'); // PREPROCESSOR-REMOVE-START
} // PREPROCESSOR-REMOVE-END*/