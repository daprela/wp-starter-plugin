# WP-Starter-Plugin
A starter plugin for WordPress.

This plugin provides the basic foundation upon which to build a plugin. It is built following modern coding standards.

Features:
* The plugin is 'namespaced'.
* A class autoloader loads classes without including files manually.
* Constants are created automatically from the plugin headers where possible.
* A function versions all of the assets from their file timestamp to bypass browser cache. Every time a file is saved the version changes and the file is refreshed.
* A basic composer file install PHP unit and a few dev tools.
* A Gulp file written for Gulp 4 provides the tools for the following.
     * Compile Sass to CSS.
     * Minification.
     * Image compression.
     * Transpile Javascript ES6 to ES5.
     * Plugin packaging.

## Instructions to use Gulp

From the terminal, give the following commands
* `npm run start`: launches Gulp in development mode and watches files for changes. The following tasks are performed 
    * Sass is compiled to CSS but not minified.
    * JavaScript is transpiled from ES6 to ES5 but not minified.
    * Images are compressed. Original non compressed images must be under *src/images/*
    * A .pot file is generated and saved under the folder *languages*.
    * Opens the browser on a new URL and refreshes it automatically every time that a script changes.
* `npm run build`: launches Gulp in production mode. The following tasks are performed 
    * Sass is compiled to CSS and minified.
    * JavaScript is transpiled from ES6 to ES5 and minified.
    * Images are compressed. Original non compressed images must be under *src/images/*
    * A .pot file is generated and saved under the folder *languages*.
    * Creates the zip file of the plugin and saves it under the folder *bundled*
* `gulp initPlugin`: replaces the strings in the plugin headers and the namespace. The replacement strings must be specified in the file `package.json`. It also rename the main files according to the new plugin name. It can't rename the root folder of the plugin. Run this command first when you download the starter plugin and before you start any development. This task doesn't work anymore after the first run because the strings are changed. Update the search strings in the Gulp file if you need to run it again.

### Using single gulp commands
The following commands are already part of the bundled instructions `npm run start` and `npm run build`. Here, they can be run alone in case of need.
* `gulp styles`: compiles the Sass files and generates the CSS files non minfied.
    * `gulp styles --prod`: compiles the Sass files and generates the CSS files minfied.
* `gulp scripts`: transpiles the JavaScript files ES6->ES5 and generates the JS files non minfied.
    * `gulp scripts --prod`: transpiles the JavaScript files ES6->ES5 and generates the JS files minfied.
* `gulp images`: copies the images from src/images to assets/images without compressing them.
    * `gulp images --prod` compresses the images in src/images and copies them to assets/images.
* `gulp clean`: deletes the images and the `.min.*` files. This operation ensures that in case we have deleted a no longer needed asset, it doesn't remain forgotten in our distribution folders.
* `gulp copy` : copies any files under src but that are not under src/{images,js,scss} to the assets folder.