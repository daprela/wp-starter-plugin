<?php

namespace dapre_wpsp\includes;

use function dapre_wpsp\get_asset_version;
use const dapre_wpsp\PLUGIN_DIR_PATH;
use const dapre_wpsp\PLUGIN_NAME;
use const dapre_wpsp\PLUGIN_URL_PATH;

// If this file is called directly, abort.
if ( ! defined( 'ABSPATH' ) ) {
	die;
}

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

		/**
		 * @var string|int $version the version to assign to the asset file will be the asset timestamp.
		 */
		$version = get_asset_version( PLUGIN_DIR_PATH . 'assets/css/admin-styles.min.css' );
		wp_enqueue_style( PLUGIN_NAME, PLUGIN_URL_PATH . 'assets/css/admin-styles.min.css', [], $version, 'all' );
	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 *
	 * @return void
	 */
	public function enqueue_scripts() {

		/**
		 * @var string|int $version the version to assign to the asset file will be the asset timestamp.
		 */
		$version = get_asset_version( PLUGIN_DIR_PATH . 'assets/js/admin.min.js' );
		wp_enqueue_script( PLUGIN_NAME, PLUGIN_URL_PATH . 'assets/js/admin.min.js', [ 'jquery' ], $version, false );
	}
}