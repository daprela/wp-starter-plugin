<?php

namespace DapreWpsp\Includes;

use function DapreWpsp\get_asset_version;
use const DapreWpsp\PLUGIN_DIR_PATH;
use const DapreWpsp\PLUGIN_NAME;
use const DapreWpsp\PLUGIN_URL_PATH;

// If this file is called directly, abort.
if ( ! defined( 'ABSPATH' ) ) {
	die;
}

/**
 * The public-facing functionality of the plugin.
 *
 * Defines two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    DapreWpsp
 * @subpackage DapreWpsp\Includes
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

		/**
		 * @var string|int $version the version to assign to the asset file will be the asset timestamp.
		 */
		$version = get_asset_version( PLUGIN_DIR_PATH . 'assets/css/frontend-styles.min.css');
		wp_enqueue_style( PLUGIN_NAME, PLUGIN_URL_PATH . 'assets/css/frontend-styles.min.css', array(), $version, 'all' );

	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 *
	 * @return void
	 */
	public function enqueue_scripts() {

		/**
		 * @var string|int $version the version to assign to the asset file will be the asset timestamp.
		 */
		$version = get_asset_version( PLUGIN_DIR_PATH . 'assets/js/frontend.min.js');
		wp_enqueue_script( PLUGIN_NAME, PLUGIN_URL_PATH . 'assets/js/frontend.min.js', array( 'jquery' ), $version, false );

	}
}