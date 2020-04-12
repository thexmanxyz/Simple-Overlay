/******************************************************
*                                                     *
*   Simple Overlay - jQuery Plugin                    *
*                                                     *
*   Purpose: This project contains a simple and full  *
*            configurable jQuery plugin which loads   *
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

    // initialize plugin and create events(s)
    $.fn.simpleOverlay = function(options) {
        var opts = $.extend(true, {}, $.fn.simpleOverlay.defaults, options);

        // set containers where the plugin should be attached
        opts.container = this;

        // attach container with JS
        opts.attachContainer(opts);

        // handle overlay open on initialize
        opts.initializeOpen(opts);

        // add trigger for overlay close
        opts.triggerClose(opts);

        // add trigger for overlay cookie open
        opts.triggerCookieOpen(opts);

        // add triger for overlay always open
        opts.triggerAlwaysOpen(opts);
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
    * attachContainer: Custom function which automatically attaches the overlay container (callback).
    * initializeOpen: Custom function which controls the overlay auto loading behavior (callback).
    * overlayOpen: Custom function which shows the overlay on open events (callback).
    * overlayOpenCheck: Custom function which shows the overlay cookie-dependent on open events (callback).
    * overlayClose: Custom function which hides the overlay on close events (callback).
    * setCookie: Custom function which sets a cookie for the plugin (callback).
    * getCookie: Custom function to retrieve a cookie set by the plugin (callback).
    * triggerOpen: Custom function to define overlay open events by a given flag (callback).
    * triggerCookieOpen: Custom function to define overlay cookie-dependent open events (callback).
    * triggerAlwaysOpen: Custom function to define overlay always open events (callback).
    * triggerClose: Custom function to define overlay close events (callback).
    * beforeAttachContainer: Custom function called before container attached (callback).
    * beforeOverlayOpen: Custom function called before overlay shown (callback).
    * beforeOverlayClose: Custom function called before overlay hidden (callback).
    * beforeSetCookie: Custom function called before cookie set (callback).
    * beforeGetCookie: Custom function called before cookie retrieved (callback).
    * afterAttachContainer: Custom function called after container attached (callback).
    * afterOverlayOpen: Custom function called after overlay shown (callback).
    * afterOverlayClose: Custom function called after overlay hidden (callback).
    * afterSetCookie: Custom function called after cookie set (callback).
    * afterGetCookie: Custom function called after cookie retrieved (callback).
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
        content: '',
        clickEvents: {
            open: '',
            alwaysOpen: '',
            close: ''
        },
        cookie: {
            name: 'simple-overlay',
            expiry: 30,
        },

        attachContainer: function(opts) {

            // callback before container attached
            opts.beforeAttachContainer.call(opts, opts);

            // create and attach HTML only when attach required
            if(opts.attach) {
                $(opts.container).each(function() {
                    var $ctn, $content, $closeBtn;

                    // build up HTML elements (container, content and close button)
                    $ctn = $('<div>').attr('id', opts.containerId).attr('style', 'display: none;').addClass('g-' + opts.containerId);
                    
                    // change style of overlay in dependence of set parameter
                    if(opts.style.startsWith('w')) {
                        $ctn.addClass('overlay-white');
                    }
                    
                    $content = $('<div>').addClass(opts.contentContainerClass).html(opts.content);
                    $closeBtn = $('<button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span>');

                    // merge elements together and prepend to container
                    $ctn.append($content);
                    $ctn.append($closeBtn);
                    $(this).prepend($ctn);
                });
            }

            // calback after container attached
            opts.afterAttachContainer.call(opts, opts);
        },
        
        initializeOpen: function(opts) {
    
            // show overlay only when required
            if(opts.openOnInit) {
                
                // should overlay be shown in dependence of cookie or not
                if(opts.checkOnInit) {
                    opts.overlayOpenCheck(opts);
                } else {
                    opts.overlayOpen(opts);
                }
            }
        },

        // credits @ https://www.w3schools.com/howto/howto_css_overlay.asp
        overlayOpen: function (opts) {
            var $ctn = $('#' + opts.containerId);
            var color = 0;
            var background = '';

            // callback before overlay shown
            opts.beforeOverlayOpen.call(opts, opts);

            // determine color for background coloring
            if(opts.style.startsWith('w')) {
                color = 255;
            }
            
            // add background css and generate style
            if(opts.background != '') {
                $ctn.addClass('background-image');
                background = 'background-image: linear-gradient(rgba(' + color + ', ' + color + ', ' + color + ',.6),rgba(' 
                                + color + ',' + color + ',' + color + ',.6)),url(' + opts.background + ');'
                
            }
            
            // attach "display: block;" to show overlay and attach background if necessary
            $ctn.attr('style', 'display: block;' + background);

            // callback after overlay shown
            opts.afterOverlayOpen.call(opts, opts);
        },

        overlayOpenCheck: function(opts) {
            var cookie = opts.getCookie(opts);
            if (cookie == '') {  
                opts.overlayOpen(opts);
            }
        },

        // credits @ https://www.w3schools.com/howto/howto_css_overlay.asp
        overlayClose: function(opts) {

            // callback before overlay hidden
            opts.beforeOverlayClose.call(opts, opts);

            // hide container
            $('#' + opts.containerId).attr('style', 'display: none;');

            // check if cookie set and set it if not defined
            var cookie = opts.getCookie(opts);
            if (cookie == '') {  
                opts.setCookie(opts);
            }

            // callback after overlay hidden
            opts.afterOverlayClose.call(opts, opts);
        },

        // set a cookie with specific value and expiry (in days)
        // credits @ https://www.w3schools.com/js/js_cookies.asp
        setCookie: function(opts) {
            var d = new Date();
            var expires;

            // callback before cookie set
            opts.beforeSetCookie.call(opts, opts);

            // calculate expiry time and create string
            d.setTime(d.getTime() + (opts.cookie.expiry * 24 * 60 * 60 * 1000));
            expires = "expires="+d.toUTCString();

            // set cookie with expires
            document.cookie = opts.cookie.name + '=true;' + expires + ';path=/';

            // callback after cookie set
            opts.afterSetCookie.call(opts, opts);
        },

        // determines if a cookie already exists, otherwise return empty string
        // credits @ https://www.w3schools.com/js/js_cookies.asp
        getCookie: function(opts) {
            var name = opts.cookie.name + "=";
            var ca = document.cookie.split(';');

            // callback before cookie retrieved
            opts.beforeGetCookie.call(opts, opts);

            for(var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {

                    // callback after cookie retrieved
                    opts.afterGetCookie.call(opts, opts);
                    return c.substring(name.length, c.length);
                }
            }

            // callback after cookie retrieved
            opts.afterGetCookie.call(opts, opts);
            return '';
        },

        // add trigger event which opens overlay in dependence of flag - can be user customized
        triggerOpen: function(opts, always) {

            // build selector string (show overlay always or not)
            var selectors = (always) ? opts.clickEvents.alwaysOpen : opts.clickEvents.open;

            // define on click event which opens overlay (when there is a non empty selector)
            if(selectors != '') {
                $(selectors).click(function() {

                    // decide whether overlay should be shown in dependence of cookie or not
                    if(always) {
                        opts.overlayOpen(opts);
                    } else {
                        opts.overlayOpenCheck(opts);
                    }
                });
            }
        },

        // add trigger event which opens overlay in dependence of cookie - can be user customized
        triggerCookieOpen: function(opts) {
            opts.triggerOpen(opts, false);
        },

        // add trigger event which always opens overlay - can be user customized
        triggerAlwaysOpen: function(opts) {
            opts.triggerOpen(opts, true);
        },

        // add trigger event which closes overlay - can be user customized
        triggerClose: function(opts) {

            // default selector for close
            var selectors = '#' + opts.containerId;

            // build selectors string
            if(opts.clickEvents.close != '') {
                selectors += (',' + opts.clickEvents.close);
            }

            // define on click event which closes overlay
            $(selectors).click(function() {
                opts.overlayClose(opts);
            });
        },

        // before container attached - can be user customized
        beforeAttachContainer: function(opts) {},

        // before overlay shown - can be user customized
        beforeOverlayOpen: function(opts) {},

        // before overlay hidden - can be user customized
        beforeOverlayClose: function(opts) {},

        // before cookie set - can be user customized
        beforeSetCookie: function(opts) {},

        // before cookie retrieved - can be user customized
        beforeGetCookie: function(opts) {},

        // after container attached - can be user customized
        afterAttachContainer: function(opts) {},

        // after overlay shown - can be user customized
        afterOverlayOpen: function(opts) {},

        // after overlay hidden - can be user customized
        afterOverlayClose: function(opts) {},

        // after cookie set - can be user customized
        afterSetCookie: function(opts) {},

        // after cookie retrieved - can be user customized
        afterGetCookie: function(opts) {},
    };

})( jQuery );

// attach plugin to html <body>, basic example
// $('body').simpleOverlay({});