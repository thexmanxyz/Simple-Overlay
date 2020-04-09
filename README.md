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
4. Initialize the plugin with basic values as follows
   * **Plugin Initialization:**
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

- `attachHtml: true,` | Defines whether the overlay HTML should be automatically attached on plugin initialization.

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
