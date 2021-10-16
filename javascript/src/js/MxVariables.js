import { MxClient } from './MxClient.js';

export class MxVariables {

    /**
     * Variable: mxLoadResources
     *
     * Optional global config variable to toggle loading of the two resource files
     * in <mxGraph> and <mxEditor>. Default is true. NOTE: This is a global variable,
     * not a variable of mxClient. If this is false, you can use <mxClient.loadResources>
     * with its callback to load the default bundles asynchronously.
     *
     * (code)
     * <script type="text/javascript">
     * 		var mxLoadResources = false;
     * </script>
     * <script type="text/javascript" src="/path/to/core/directory/js/mxClient.js"></script>
     * (end)
     */
    static mxLoadResources;

    /**
     * Variable: mxForceIncludes
     *
     * Optional global config variable to force loading the JavaScript files in
     * development mode. Default is undefined. NOTE: This is a global variable,
     * not a variable of mxClient.
     *
     * (code)
     * <script type="text/javascript">
     * 		var mxLoadResources = true;
     * </script>
     * <script type="text/javascript" src="/path/to/core/directory/js/mxClient.js"></script>
     * (end)
     */
    static mxForceIncludes;

    /**
     * Variable: mxResourceExtension
     *
     * Optional global config variable to specify the extension of resource files.
     * Default is true. NOTE: This is a global variable, not a variable of mxClient.
     *
     * (code)
     * <script type="text/javascript">
     * 		var mxResourceExtension = '.txt';
     * </script>
     * <script type="text/javascript" src="/path/to/core/directory/js/mxClient.js"></script>
     * (end)
     */
    static mxResourceExtension;

    /**
     * Variable: mxLoadStylesheets
     *
     * Optional global config variable to toggle loading of the CSS files when
     * the library is initialized. Default is true. NOTE: This is a global variable,
     * not a variable of mxClient.
     *
     * (code)
     * <script type="text/javascript">
     * 		var mxLoadStylesheets = false;
     * </script>
     * <script type="text/javascript" src="/path/to/core/directory/js/mxClient.js"></script>
     * (end)
     */
    static mxLoadStylesheets;

    /**
     * Variable: basePath
     *
     * Basepath for all URLs in the core without trailing slash. Default is '.'.
     * Set mxBasePath prior to loading the mxClient library as follows to override
     * this setting:
     *
     * (code)
     * <script type="text/javascript">
     * 		mxBasePath = '/path/to/core/directory';
     * </script>
     * <script type="text/javascript" src="/path/to/core/directory/js/mxClient.js"></script>
     * (end)
     *
     * When using a relative path, the path is relative to the URL of the page that
     * contains the assignment. Trailing slashes are automatically removed.
     */
    static mxBasePath;

    /**
     * Variable: imageBasePath
     *
     * Basepath for all images URLs in the core without trailing slash. Default is
     * <mxClient.basePath> + '/images'. Set mxImageBasePath prior to loading the
     * mxClient library as follows to override this setting:
     *
     * (code)
     * <script type="text/javascript">
     * 		mxImageBasePath = '/path/to/image/directory';
     * </script>
     * <script type="text/javascript" src="/path/to/core/directory/js/mxClient.js"></script>
     * (end)
     *
     * When using a relative path, the path is relative to the URL of the page that
     * contains the assignment. Trailing slashes are automatically removed.
     */
    static mxImageBasePath;

    /**
     * Variable: language
     *
     * Defines the language of the client, eg. en for english, de for german etc.
     * The special value 'none' will disable all built-in internationalization and
     * resource loading. See <mxResources.getSpecialBundle> for handling identifiers
     * with and without a dash.
     *
     * Set mxLanguage prior to loading the mxClient library as follows to override
     * this setting:
     *
     * (code)
     * <script type="text/javascript">
     * 		mxLanguage = 'en';
     * </script>
     * <script type="text/javascript" src="js/mxClient.js"></script>
     * (end)
     *
     * If internationalization is disabled, then the following variables should be
     * overridden to reflect the current language of the system. These variables are
     * cleared when i18n is disabled.
     * <mxEditor.askZoomResource>, <mxEditor.lastSavedResource>,
     * <mxEditor.currentFileResource>, <mxEditor.propertiesResource>,
     * <mxEditor.tasksResource>, <mxEditor.helpResource>, <mxEditor.outlineResource>,
     * <mxElbowEdgeHandler.doubleClickOrientationResource>, <mxUtils.errorResource>,
     * <mxUtils.closeResource>, <mxGraphSelectionModel.doneResource>,
     * <mxGraphSelectionModel.updatingSelectionResource>, <mxGraphView.doneResource>,
     * <mxGraphView.updatingDocumentResource>, <mxCellRenderer.collapseExpandResource>,
     * <mxGraph.containsValidationErrorsResource> and
     * <mxGraph.alreadyConnectedResource>.
     */
    static mxLanguage;

    /**
     * Variable: defaultLanguage
     *
     * Defines the default language which is used in the common resource files. Any
     * resources for this language will only load the common resource file, but not
     * the language-specific resource file. Default is 'en'.
     *
     * Set mxDefaultLanguage prior to loading the mxClient library as follows to override
     * this setting:
     *
     * (code)
     * <script type="text/javascript">
     * 		mxDefaultLanguage = 'de';
     * </script>
     * <script type="text/javascript" src="js/mxClient.js"></script>
     * (end)
     */
    static mxDefaultLanguage;

    /**
     * Variable: languages
     *
     * Defines the optional array of all supported language extensions. The default
     * language does not have to be part of this list. See
     * <mxResources.isLanguageSupported>.
     *
     * (code)
     * <script type="text/javascript">
     * 		mxLanguages = ['de', 'it', 'fr'];
     * </script>
     * <script type="text/javascript" src="js/mxClient.js"></script>
     * (end)
     *
     * This is used to avoid unnecessary requests to language files, ie. if a 404
     * will be returned.
     */
    static mxLanguages;

    static loadConfig(config) {

        Object.keys(config).forEach(key => {
            MxVariables[key] = config[key];
        });

        if (typeof(MxVariables.mxLoadResources) == 'undefined') {
            MxVariables.mxLoadResources = true;
        }

        if (typeof(MxVariables.mxForceIncludes) == 'undefined') {
            MxVariables.mxForceIncludes = false;
        }

        if (typeof(MxVariables.mxResourceExtension) == 'undefined')
        {
            MxVariables.mxResourceExtension = '.txt';
        }

        if (typeof(MxVariables.mxLoadStylesheets) == 'undefined') {
            MxVariables.mxLoadStylesheets = true;
        }

        if (typeof(MxVariables.mxBasePath) != 'undefined' && MxVariables.mxBasePath.length > 0) {
            // Adds a trailing slash if required
            if (MxVariables.mxBasePath.substring(mxBasePath.length - 1) == '/')
            {
                MxVariables.mxBasePath = MxVariables.mxBasePath.substring(0, MxVariables.mxBasePath.length - 1);
            }

            MxClient.basePath = MxVariables.mxBasePath;
        }
        else {
            MxClient.basePath = '.';
        }

        if (typeof(MxVariables.mxImageBasePath) != 'undefined' && MxVariables.mxImageBasePath.length > 0) {
            // Adds a trailing slash if required
            if (MxVariables.mxImageBasePath.substring(MxVariables.mxImageBasePath.length - 1) == '/') {
                MxVariables.mxImageBasePath = MxVariables.mxImageBasePath.substring(0, MxVariables.mxImageBasePath.length - 1);
            }

            MxClient.imageBasePath = MxVariables.mxImageBasePath;
        }
        else {
            MxClient.imageBasePath = MxClient.basePath + '/images';
        }

        if (typeof(MxVariables.mxLanguage) != 'undefined' && MxVariables.mxLanguage != null) {
            MxClient.language = MxVariables.mxLanguage;
        }
        else {
            MxClient.language = (MxClient.IS_IE) ? navigator.userLanguage : navigator.language;
        }

        if (typeof(MxVariables.mxDefaultLanguage) != 'undefined' && MxVariables.mxDefaultLanguage != null) {
            MxClient.defaultLanguage = MxVariables.mxDefaultLanguage;
        }
        else {
            MxClient.defaultLanguage = 'en';
        }

        // Adds all required stylesheets and namespaces
        if (MxVariables.mxLoadStylesheets) {
            MxClient.link('stylesheet', MxClient.basePath + '/css/common.css');
        }

        if (typeof(MxVariables.mxLanguages) != 'undefined' && MxVariables.mxLanguages != null) {
            MxClient.languages = MxVariables.mxLanguages;
        }

        // Adds required namespaces, stylesheets and memory handling for older IE browsers
        if (MxClient.IS_VML) {
            if (MxClient.IS_SVG) {
                MxClient.IS_VML = false;
            }
            else {
                // Enables support for IE8 standards mode. Note that this requires all attributes for VML
                // elements to be set using direct notation, ie. node.attr = value, not setAttribute.
                if (document.namespaces != null) {
                    if (document.documentMode == 8) {
                        document.namespaces.add(MxClient.VML_PREFIX, 'urn:schemas-microsoft-com:vml', '#default#VML');
                        document.namespaces.add(MxClient.OFFICE_PREFIX, 'urn:schemas-microsoft-com:office:office', '#default#VML');
                    }
                    else {
                        document.namespaces.add(MxClient.VML_PREFIX, 'urn:schemas-microsoft-com:vml');
                        document.namespaces.add(MxClient.OFFICE_PREFIX, 'urn:schemas-microsoft-com:office:office');
                    }
                }

                // Workaround for limited number of stylesheets in IE (does not work in standards mode)
                if (MxClient.IS_QUIRKS && document.styleSheets.length >= 30) {
                    (function() {
                        let node = document.createElement('style');
                        node.type = 'text/css';
                        node.styleSheet.cssText = MxClient.VML_PREFIX + '\\:*{behavior:url(#default#VML)}' +
                            mxClient.OFFICE_PREFIX + '\\:*{behavior:url(#default#VML)}';
                        document.getElementsByTagName('head')[0].appendChild(node);
                    })();
                }
                else {
                    document.createStyleSheet().cssText = MxClient.VML_PREFIX + '\\:*{behavior:url(#default#VML)}' +
                        mxClient.OFFICE_PREFIX + '\\:*{behavior:url(#default#VML)}';
                }

                if (MxVariables.mxLoadStylesheets)
                {
                    MxClient.link('stylesheet', MxClient.basePath + '/css/explorer.css');
                }
            }
        }

    }
}



