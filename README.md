# WP-Starter-Plugin
A starter plugin for WordPress.

This plugin provides the basic foundation upon which to build a plugin. It is built following modern coding standards.

Features:
* The plugin is 'namespaced'.
* A class autoloader loads classes without including files manually.
* Constants are created automatically from the plugin headers where possible.
* A function versions all of the assets from their file timestamp to bypass browser cache. Every time a file is saved the version changes and the file is refreshed.
* A basic composer file install PHP unit and a few dev tools.
* A demo Gutenberg block is provided with a PHP class for basic management.
* A Gulp file written for Gulp 4 provides the tools for the following.
     * Compile Sass to CSS.
     * Minification.
     * Image compression.
     * Transpile Javascript ES6 to ES5.
     * Plugin packaging.
* A webpack workflow is provided to compile the Gutenberg blocks.

## Instructions to use Gulp
The Gulp workflow has been created to allow building a modern plugin with the latest JS and SCSS.
From the terminal, give the following commands
* `npm run dev`: launches Gulp in development mode and watches files for changes. The following tasks are performed 
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
The following commands are already part of the bundled instructions `npm run dev` and `npm run build`. Here, they can be run alone in case of need.
* `gulp styles`: compiles the Sass files and generates the CSS files non minfied.
    * `gulp styles --prod`: compiles the Sass files and generates the CSS files minfied.
* `gulp scripts`: transpiles the JavaScript files ES6->ES5 and generates the JS files non minfied.
    * `gulp scripts --prod`: transpiles the JavaScript files ES6->ES5 and generates the JS files minfied.
* `gulp images`: copies the images from src/images to assets/images without compressing them.
    * `gulp images --prod` compresses the images in src/images and copies them to assets/images.

The two following commands are not part of the Gulp workflow and are intended as utilities to be used in case of need.
* `gulp clean`: deletes the images and the `.min.*` files. This operation ensures that in case we have deleted a no longer needed asset, it doesn't remain forgotten in our distribution folders.
* `gulp copy` : copies any files under src but that are not under src/{images,js,scss} to the assets folder. Use it if you want to distribute your non minified assets.

## Instructions to use Webpack
The Webpack workflow is provided to allow compiling the Gutenberg blocks. If you don't want to develop a Gutenberg block you can delete the `blocks` folder and the three webpack files, and ignore this chapter.

Webpack compiles all of the assets in the `blocks` folder, provided that they are imported in the JS files.
All assets not imported will not be part of the dependency chain and therefore Webpack will ignore them.
The following commands are available:
* `npm run devGutenberg`: runs Webpack in development mode. JS and CSS are mapped. The assets are 'watched' and recompiled if they change.
* `npm run buildGutenberg`: runs Webpack in production mode. All assets are optimized and minimized.

## Developing Gutenberg blocks in your plugin
Unfortunately, I haven't been able to unify the workflow and do everything with Gulp. I've also tried Webpack stream to use Webpack with Gulp but the assets are not compiled correctly.
If you want to develop Gutenberg blocks there are two possibilities:
1. During the development you open two terminals. In one you run the Webpack command, in the other you run the Gulp command.
2. From the same terminal, run Webpack while developing the Gutenberg blocks, run Gulp when you develop the rest of the plugin.

**IMPORTANT NOTE**: when you are ready for production, run the Webpack build command first to minimize the Gutenberg assets, then run the Gulp build command to build the zip file.
