/******************************************************
*                                                     *
*   Simple Overlay - jQuery Plugin                    *
*                                                     *
*   Purpose: This project contains a simple and full  *
*            configurable jQuery plugin that loads    *
*            a cookie-controlled overlay on a page    *
*            which can also only be shown once        *
*            within a specific period. The loading    *
*            of the overlay can be triggered          *
*            automatically or by specific events.     *
*                                                     *
*   Author: Andreas Kar (thex) <andreas.kar@gmx.at>   *
*   Repository: https://git.io/JvpkM                  *
*                                                     *
******************************************************/

(function( $ ) {

    // all configurations
    var config;

    // initialize plugin and create events(s)
    $.fn.simpleOverlay = function(options) {
        config = $.extend(true, {}, $.fn.simpleOverlay.defaults, options);

        // set containers where the plugin should be attached
        config.container = this;

        // attach container with JS
        config.attachContainer();

        // handle overlay open on initialize
        config.initializeOpen();

        // add trigger for overlay close
        config.triggerClose();

        // add trigger for overlay cookie open
        config.triggerCookieOpen();

        // add trigger for overlay always open
        config.triggerAlwaysOpen();
        
        // add custom triggers
        config.triggerCustom();
    };

   /* default values
    *
    * attach: Defines whether the overlay HTML should be automatically attached on plugin initialization.
    * openOnInit: Defines whether the overlay should be shown on plugin initialization.
    * checkOnInit: Defines whether the cookie should be checked before the overlay is shown.
    * background: Background image used for the overlay. Preferably a svg image which can be scaled to screensize.
    * style: Set the color style for the overlay. Supported values are 'black' / 'b' or 'white' / 'w'.
    * containerId: The id used for the overlay container during initialization and identification.
    * contentContainerClass: The class attached to the content container.
    * content: The HTML appended to the content container. This is the text shown on the overlay.
    * clickEvents.open: Additional selectors used for click events that cookie-dependent open the overlay.
    * clickEvents.alwaysOpen: Additional selectors used for click events that always open the overlay.
    * clickEvents.close: Additional selectors used for click events that close the overlay.
    * cookie.name: This parameters contains the name used for creating the plugin cookie.
    * cookie.expiry: This parameters defines the expiry time (in days) for a cookie set by the plugin.
    * attachContainer: Function which automatically attaches the overlay container (callback).
    * initializeOpen: Function which controls the overlay auto loading behavior (callback).
    * overlayOpen: Function which shows the overlay on open events (callback).
    * overlayOpenCheck: Function which shows the overlay cookie-dependent on open events (callback).
    * overlayClose: Function which hides the overlay on close events (callback).
    * setCookie: Function which sets a cookie for the plugin (callback).
    * getCookie: Function to retrieve a cookie set by the plugin (callback).
    * triggerOpen: Function to define overlay open events by a given flag (callback).
    * triggerCookieOpen: Function to define overlay cookie-dependent open events (callback).
    * triggerAlwaysOpen: Function to define overlay always open events (callback).
    * triggerClose: Function to define overlay close events (callback).
    * triggerCustom: Function to define custom trigger events (callback).
    * beforeAttachContainer: Function called before container attached (callback).
    * beforeOverlayOpen: Function called before overlay shown (callback).
    * beforeOverlayClose: Function called before overlay hidden (callback).
    * beforeSetCookie: Function called before cookie set (callback).
    * beforeGetCookie: Function called before cookie retrieved (callback).
    * afterAttachContainer: Function called after container attached (callback).
    * afterOverlayOpen: Function called after overlay shown (callback).
    * afterOverlayClose: Function called after overlay hidden (callback).
    * afterSetCookie: Function called after cookie set (callback).
    * afterGetCookie: Function called after cookie retrieved (callback).
    *
    */
    $.fn.simpleOverlay.defaults = {
        attach: true,
        openOnInit: true,
        checkOnInit: true,
        background: '',
        style: 'black',
        containerId: 'simple-overlay',
        contentContainerClass: 'simple-container',
        hideClass: 'simple-hide',
        content: '',
        clickEvents: {
            open: [],
            alwaysOpen: [],
            close: []
        },
        cookie: {
            name: 'simple-overlay',
            expiry: 30,
        },

        attachContainer: function() {

            // callback before container attached
            config.beforeAttachContainer.call(config);

            // create and attach HTML only when attach required
            if(config.attach) {
                $(config.container).each(function() {
                    var $ctn, $content, $closeBtn;

                    // build up HTML elements (container, content and close button)
                    $ctn = $('<div>').attr('id', config.containerId).addClass(config.hideClass).addClass(config.containerId);
                    
                    // change style of overlay in dependence of set parameter
                    if(config.style.startsWith('w')) {
                        $ctn.addClass('overlay-white');
                    }
                    
                    $content = $('<div>').addClass(config.contentContainerClass).html(config.content);
                    $closeBtn = $('<button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span>');

                    // merge elements together and prepend to container
                    $ctn.append($content);
                    $ctn.append($closeBtn);
                    $(this).prepend($ctn);
                });
            }

            // calback after container attached
            config.afterAttachContainer.call(config);
        },
        
        initializeOpen: function() {
    
            // show overlay only when required
            if(config.openOnInit) {
                
                // should overlay be shown in dependence of cookie or not
                if(config.checkOnInit) {
                    config.overlayOpenCheck();
                } else {
                    config.overlayOpen();
                }
            }
        },

        // credits @ https://www.w3schools.com/howto/howto_css_overlay.asp
        overlayOpen: function () {
            var $ctn = $('#' + config.containerId);
            var color = 0;
            var background = '';

            // callback before overlay shown
            config.beforeOverlayOpen.call(config);

            // determine color for background coloring
            if(config.style.startsWith('w')) {
                color = 255;
            }
            
            // add background css and generate style
            if(config.background != '') {
                $ctn.addClass('background-image');
                background = 'background-image: linear-gradient(rgba(' + color + ', ' + color + ', ' + color + ',.6),rgba(' 
                                + color + ',' + color + ',' + color + ',.6)),url(' + config.background + ');'
                
            }
			
			// remove hide class to show overlay
			$ctn.removeClass(config.hideClass);
            
            // attach background if necessary
            $ctn.attr('style', background);

            // callback after overlay shown
            config.afterOverlayOpen.call(config);
        },

        overlayOpenCheck: function() {
            var cookie = config.getCookie();
            if (cookie == '') {  
                config.overlayOpen();
            }
        },

        // credits @ https://www.w3schools.com/howto/howto_css_overlay.asp
        overlayClose: function() {

            // callback before overlay hidden
            config.beforeOverlayClose.call(config);

            // hide container
            $('#' + config.containerId).addClass(config.hideClass);

            // check if cookie set and set it if not defined
            var cookie = config.getCookie();
            if (cookie == '') {  
                config.setCookie();
            }

            // callback after overlay hidden
            config.afterOverlayClose.call(config);
        },

        // set a cookie with specific value and expiry (in days)
        // credits @ https://www.w3schools.com/js/js_cookies.asp
        setCookie: function() {
            var d = new Date();
            var expires;

            // callback before cookie set
            config.beforeSetCookie.call(config);

            // calculate expiry time and create string
            d.setTime(d.getTime() + (config.cookie.expiry * 24 * 60 * 60 * 1000));
            expires = "expires="+d.toUTCString();

            // set cookie with expires
            document.cookie = config.cookie.name + '=true;' + expires + ';path=/';

            // callback after cookie set
            config.afterSetCookie.call(config);
        },

        // determines if a cookie already exists, otherwise return empty string
        // credits @ https://www.w3schools.com/js/js_cookies.asp
        getCookie: function() {
            var name = config.cookie.name + "=";
            var ca = document.cookie.split(';');

            // callback before cookie retrieved
            config.beforeGetCookie.call(config);

            for(var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {

                    // callback after cookie retrieved
                    config.afterGetCookie.call(config);
                    return c.substring(name.length, c.length);
                }
            }

            // callback after cookie retrieved
            config.afterGetCookie.call(config);
            return '';
        },

        // add trigger event which opens overlay in dependence of flag
        triggerOpen: function(always) {

            // build selector string (show overlay always or not)
            var selectors = (always) ? config.clickEvents.alwaysOpen.join(',') : config.clickEvents.open.join(',');

            // define on click event which opens overlay (when there is a non empty selector)
            if(selectors != '') {
                $(selectors).click(function() {

                    // decide whether overlay should be shown in dependence of cookie or not
                    if(always) {
                        config.overlayOpen();
                    } else {
                        config.overlayOpenCheck();
                    }
                });
            }
        },

        // add trigger event which opens overlay in dependence of cookie
        triggerCookieOpen: function() {
            config.triggerOpen(false);
        },

        // add trigger event which always opens overlay
        triggerAlwaysOpen: function() {
            config.triggerOpen(true);
        },

        // add trigger event which closes overlay
        triggerClose: function() {

            // default selector for close
            var selectors = '#' + config.containerId;

            // build selectors string
            if(config.clickEvents.close.length > 0) {
                selectors += (',' + config.clickEvents.close.join(','));
            }

            // define on click event which closes overlay
            $(selectors).click(function() {
                config.overlayClose();
            });
        },
        
        // add custom trigger events
        triggerCustom: function() {},

        // before container attached
        beforeAttachContainer: function() {},

        // before overlay shown
        beforeOverlayOpen: function() {},

        // before overlay hidden
        beforeOverlayClose: function() {},

        // before cookie set
        beforeSetCookie: function() {},

        // before cookie retrieved
        beforeGetCookie: function() {},

        // after container attached
        afterAttachContainer: function() {},

        // after overlay shown
        afterOverlayOpen: function() {},

        // after overlay hidden
        afterOverlayClose: function() {},

        // after cookie set
        afterSetCookie: function() {},

        // after cookie retrieved
        afterGetCookie: function() {},
    };

})( jQuery );

// attach plugin to html <body>, basic example
// $('body').simpleOverlay({});