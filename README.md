# Simple Overlay
This project contains a simple and full configurable jQuery plugin which loads a cookie-controlled overlay on a page which can also only be shown once within a specific period. The plugin is fully configurable and the loading of the overlay can be triggered automatically or by specific events. If you want to try it yourself, simply download the latest version and follow the installation guide below. 

## Prerequisites
* Basic web frontend knowledge
* jQuery core library

## Download / Installation
1. [Download v1.0.0](https://github.com/thexmanxyz/Simple-Overlay/archive/v1.0.0.zip) of Simple Overlay
2. Extract the files and copy them to your website folder
3. Define the CSS and JS resource files in your HTML page. You can also place the `<script>` tag after your `<body>` content. Basic resource import example:
   * **JS:**
   ```HTML
   <script src="js/simple-overlay.min.js"></script>
   ```
   * **CSS:**
   ```HTML
   <link href="css/simple-overlay.min.css" rel="stylesheet">
   ```
   * **SCSS:** if you want to use SCSS instead
   ```SCSS
   @import 'simple-overlay.scss';
   ```
4. Initialize the plugin with basic values as follows:
   ```JS
   $('body').simpleOverlay({});
   ``` 
   
   or
   
   ```JS
   jQuery('body').simpleOverlay({});
   ```
5. If you want to further customize the appearance or behavior please take a closer look on the plugin parameters and their explanation listed in the next section.

## Configuration and Parameters
The plugin can be easily configured during the initialization and the following parameters are currently available. The listing contains the parameters together with their default values.

- `attach: true,` | Defines whether the overlay HTML should be automatically attached on plugin initialization.
- `openOnInit: true,` | Defines whether the overlay should be shown on plugin initialization.
- `checkOnInit: true,` | Defines whether the cookie should be checked before the overlay is shown.
- `background: '',` | Background image used for the overlay. Preferably a svg image which can be scaled to screensize.
- `style: 'black',` | Set the color style for the overlay. Supported values are `black` / `b` or `white` / `w`.
- `containerId: 'simple-overlay',` | The id used for the overlay container during initialization and identification.
- `contentContainerClass: 'simple-container',` | The class attached to the content container.
- `content: '',` | The HTML appended to the content container. This is the text shown on the overlay.
- `clickEvents: {` | Click events attachable by CSS selectors for different operations.
    - `open: '',` | Additional selectors used for click events that cookie-dependent open the overlay.
    - `alwaysOpen: '',` | Additional selectors used for click events that always open the overlay.
    - `close: ''},` | Additional selectors used for click events that close the overlay.
- `cookie {` | Cookie settings used for overlay control.
    - `name: '',` | This parameters contains the name used for creating the plugin cookie.
    - `expiry: ''},` | This parameters defines the expiry time (in days) for a cookie set by the plugin.
- `attachContainer: function(opts){ ... },` | Function which automatically attaches the overlay container (callback).
- `initializeOpen: function(opts){ ... },` | Function which controls the overlay auto loading behavior (callback).
- `overlayOpen: function(opts){ ... },` | Function which shows the overlay on open events (callback).
- `overlayOpenCheck: function(opts){ ... },` | Function which shows the overlay cookie-dependent on open events (callback).
- `overlayClose: function(opts){ ... },` | Function which hides the overlay on close events (callback).
- `setCookie: function(opts){ ... },` | Function which sets a cookie for the plugin (callback).
- `getCookie: function(opts){ ... },` | Function to retrieve a cookie set by the plugin (callback).
- `triggerOpen: function(opts){ ... },` | Function to define overlay open events by a given flag (callback).
- `triggerCookieOpen: function(opts){ ... },` | Function to define overlay cookie-dependent open events (callback).
- `triggerAlwaysOpen: function(opts){ ... },` | Function to define overlay always open events (callback).
- `triggerClose: function(opts){ ... },` | Function to define overlay close events (callback).
- `beforeAttachContainer: function(opts){ ... },` | Function called before container attached (callback).
- `beforeOverlayOpen: function(opts){ ... },` | Function called before overlay shown (callback).
- `beforeOverlayClose: function(opts){ ... },` | Function called before overlay hidden (callback).
- `beforeSetCookie: function(opts){ ... },` | Function called before cookie set (callback).
- `beforeGetCookie: function(opts){ ... },` | Function called before cookie retrieved (callback).
- `afterAttachContainer: function(opts){ ... },` |Function called after container attached (callback).
- `afterOverlayOpen: function(opts){ ... },` | Function called after overlay shown (callback).
- `afterOverlayClose: function(opts){ ... },` | Function called after overlay hidden (callback).
- `afterSetCookie: function(opts){ ... },` | Function called after cookie set (callback).
- `afterGetCookie: function(opts){ ... }` | Function called after cookie retrieved (callback).

### Usage / Examples


## Features

* 
* fully customizable through different callback methods at important execution points

## Future Tasks
- [?] Currently no future tasks known.

## Known Issues
None

## Dependencies
* [jQuery](https://jquery.com/)

## Credits

Thanks to the jQuery team for this [great plugin tutorial](https://learn.jquery.com/plugins/basic-plugin-creation/).

Thanks to [w3schools.com](https://www.w3schools.com) for providing the following two usesful tutorials on [overlays](https://www.w3schools.com/howto/howto_css_overlay.asp) and [cookies](https://www.w3schools.com/js/js_cookies.asp).

## by [thex](https://github.com/thexmanxyz)
Copyright (c) 2020, free to use in personal and commercial software as per the [license](/LICENSE).
