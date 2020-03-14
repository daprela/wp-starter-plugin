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
* A webpack workflow is provided to compile the Gutenberg blocks and/or all assets at your choice.
* An .eslint file is also provided configured with the 'airbnb eslint' configuration via npm.
* This boilerplate supports React out of the box.

**NOTE** Because this plugin requires to use Gulp to compile the assets, all source files (JS, SCSS and images) must go under the *src* folder for the normal assets and under the *blocks* folder for the Gutenberg blocks.
The compiled files will go automatically under the *assets* folder.

## Instructions to use Gulp
The Gulp workflow has been created to allow building a modern plugin with the latest JS and SCSS.
Webpack has been fully integrated in Gulp and is part of the Gulp workflow.

There are three workflow available out of the box but nothing prevents you from creating your own from this base.

All commands described must be launched via terminal.

#### First Workflow
Use this if you don't want to develop any Gutenberg blocks and just want to develop your plugin the traditional way.
* `npm run dev`: launches Gulp in development mode and watches files for changes. The following tasks are performed 
    * Sass is compiled to CSS but not minified.
    * JavaScript is transpiled from ES6 to ES5 but not minified. This task is done via WebPack.
    * Images are compressed. Original non compressed images must be under *src/images/*
    * A .pot file is generated and saved under the folder *languages*.
    * Opens the browser on a new URL and refreshes it automatically every time that a script changes.
* `npm run build`: launches Gulp in production mode. The following tasks are performed 
    * Sass is compiled to CSS and minified.
    * JavaScript is transpiled from ES6 to ES5 and minified. This task is done via WebPack.
    * Images are compressed. Original non compressed images must be under *src/images/*
    * A .pot file is generated and saved under the folder *languages*.
    * Creates the zip file of the plugin and saves it under the folder *bundled*

#### Second Workflow
Use this if you want to develop a Gutenberg blocks but want to develop the rest of the plugin the traditional way.
* `npm run devGutenberg`: Like `npm run dev` with these additional tasks:
    * Webpack compiles all assets present in the *block* folder.
    * JS and CSS are mapped.
    * The assets are 'watched' and recompiled if they change.
* `npm run buildGutenberg`: Like `npm run build` with these additional tasks:
    * Webpack compiles all assets present in the *block* folder.
    * JS and CSS are minified
    * Creates the zip file of the plugin and saves it under the folder *bundled*

#### Third Workflow
Use this if you want to go fully Webpack. You'll have to import all your assets into the JS files to allow Webpack to build a dependency graph.
* `npm run devAll`: Like `npm run dev` with these additional tasks:
    * Sass is compiled to CSS but not minified.
    * JavaScript is transpiled from ES6 to ES5 but not minified.
    * Images are compressed. Original non compressed images must be under *src/images/*
    * A .pot file is generated and saved under the folder *languages*.
    * Opens the browser on a new URL and refreshes it automatically every time that a script changes.
* `npm run buildAll`: Like `npm run build` with these additional tasks:
    * Sass is compiled to CSS and minified.
    * JavaScript is transpiled from ES6 to ES5 and minified. This task is done via WebPack.
    * Images are compressed. Original non compressed images must be under *src/images/*
    * A .pot file is generated and saved under the folder *languages*.
    * Creates the zip file of the plugin and saves it under the folder *bundled*

* `gulp buildSources`: This command runs alone and create a distributable zip file that contains the whole plugin sources excluding the *node_modules* and *composer* directories.
* `gulp initPlugin`: Replaces the strings in the plugin headers and the namespace. The replacement strings must be specified in the file `package.json`. It also rename the main files according to the new plugin name. It can't rename the root folder of the plugin. Run this command first when you download the starter plugin and before you start any development. This task doesn't work anymore after the first run because the strings are changed. Update the search strings in the Gulp file if you need to run it again.
* `gulp removeGutenberg`: If you don't need Gutenberg in your plugin, run this command and all the files and code for Gutenberg blocks will be removed.

### Using single gulp commands
The following commands are already part of the bundled instructions `npm run dev` and `npm run build`. Here, they can be run alone in case of need.
* `gulp styles`: compiles the Sass files and generates the CSS files non minfied.
    * `gulp styles --prod`: compiles the Sass files and generates the CSS files minfied.
* `gulp images`: copies the images from src/images to assets/images without compressing them.
    * `gulp images --prod` compresses the images in src/images and copies them to assets/images.

The two following commands are not part of the Gulp workflow and are intended as utilities to be used in case of need.
* `gulp clean`: deletes the images and the `.min.*` files. This operation ensures that in case we have deleted a no longer needed asset, it doesn't remain forgotten in our distribution folders.

## Instructions to use Webpack
The Webpack workflow is provided to allow compiling the Gutenberg blocks. All JavaScript files in the plugin are always transpiled using WebPack.
If you don't want to develop a Gutenberg block you can delete the `blocks` folder.

Webpack compiles all of the assets, provided that they are imported in the JS files.
All assets not imported will not be part of the dependency graph and therefore Webpack will ignore them.
The following commands are available:
* `'dev' tasks`: Runs Webpack in development mode. JS and CSS are mapped. The assets are 'watched' and recompiled if they change.
* `'build' tasks`: Runs Webpack in production mode. All assets are optimized and minimized.

