<?php

namespace dapre_wpsp\includes;

// If this file is called directly, abort.
if ( ! defined( 'ABSPATH' ) ) {
	die;
}

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://giuliodaprela.com
 * @since      1.0.0
 *
 * @package    dapre_wpsp
 * @subpackage dapre_wpsp/includes
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    dapre_wpsp
 * @subpackage dapre_wpsp/includes
 * @author     Giulio Daprela <giulio.daprela@gmail.com>
 */
class Admin {

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 *
	 * @return void
	 */
	public function __construct() {

	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 *
	 * @return void
	 */
	public function enqueue_styles() {

		/*
		 * This function is provided for demonstration purposes only.
		 */

		/**
		 * @var string|int $version the version to assign to the asset file.
		 * It will be the asset timestamp if we are in debug mode, the plugin version if we are in production mode
		 */
		$version = \dapre_wpsp\get_asset_version( \dapre_wpsp\PLUGIN_DIR_PATH . 'assets/css/admin-styles.min.css' );
		wp_enqueue_style( \dapre_wpsp\PLUGIN_NAME, \dapre_wpsp\PLUGIN_URL_PATH . 'assets/css/admin-styles.min.css', [], $version, 'all' );

	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 *
	 * @return void
	 */
	public function enqueue_scripts() {

		/*
		 * This function is provided for demonstration purposes only.
		 */

		/**
		 * @var string|int $version the version to assign to the asset file.
		 * It will be the asset timestamp if we are in debug mode, the plugin version if we are in production mode
		 */
		$version = \dapre_wpsp\get_asset_version( \dapre_wpsp\PLUGIN_DIR_PATH . 'assets/js/wp-starter-plugin.min.js' );
		wp_enqueue_script( \dapre_wpsp\PLUGIN_NAME, \dapre_wpsp\PLUGIN_URL_PATH . 'assets/js/wp-starter-plugin.min.js', [ 'jquery' ], $version, false );

	}
}
