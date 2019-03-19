# WP-Starter-Plugin
A starter plugin for WordPress.

This plugin provides the basic foundation upon which to build a plugin. It is built following modern coding standards.

Features:
* The plugin is 'namespaced'.
* A class autoloader loads classes without including files manually.
* Constants are created automatically from the plugin headers where possible.
* A function detects if the plugin is in debug mode. In that case, all of the assets are versioned from their file timestamp to bypass browser cache. Every time a file is saved the version changes and the file is refreshed.
* A basic composer file install PHP unit and a few dev tools
* A Gulp file written for Gulp 4 provides the tools for the following
     * Transpile SCSS to CSS.
     * Minification.
     * Image compression.
     * Transpile Javascript ES6 to ES5.
     * plugin packaging.