<?php

namespace dapre_wpsp\includes;

// If this file is called directly, abort.
if ( ! defined( 'ABSPATH' ) ) {
	die;
}

/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://giuliodaprela.com
 * @since      1.0.0
 *
 * @package    dapre_wpsp
 * @subpackage dapre_wpsp/plugin_public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    dapre_wpsp
 * @subpackage dapre_wpsp/includes
 * @author     Giulio Daprela <giulio.daprela@gmail.com>
 */
class Plugin_Public {

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
	 * Register the stylesheets for the public-facing side of the site.
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
		$version = \dapre_wpsp\get_asset_version( \dapre_wpsp\PLUGIN_DIR_PATH . 'plugin-public/css/frontend-styles.min.css');
		wp_enqueue_style( \dapre_wpsp\PLUGIN_NAME, \dapre_wpsp\PLUGIN_URL_PATH . 'plugin-admin/css/frontend-styles.min.css', array(), $version, 'all' );

	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
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
		$version = \dapre_wpsp\get_asset_version( \dapre_wpsp\PLUGIN_DIR_PATH . 'plugin-public/js/wp-starter-plugin.min.js');
		wp_enqueue_script( \dapre_wpsp\PLUGIN_NAME, \dapre_wpsp\PLUGIN_URL_PATH . 'plugin-admin/js/wp-starter-plugin.min.js', array( 'jquery' ), $version, false );

	}

}