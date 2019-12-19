<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://giuliodaprela.com
 * @since             1.0.0
 * @author            Giulio Daprela
 * @package           dapre_wpsp
 *
 * @wordpress-plugin
 * Plugin Name:       WordPress Starter Plugin
 * Plugin URI:        https://giuliodaprela.com
 * Description:       A WordPress starter plugin.
 * Version:           1.0.0
 * Author:            Giulio Daprela
 * Author URI:        https://giuliodaprela.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       dapre-wpsp
 * Domain Path:       /languages
 */

namespace dapre_wpsp;

use dapre_wpsp\includes;

// If this file is called directly, abort.
if ( ! defined( 'ABSPATH' ) ) {
	die;
}

setup_constants();

/**
 * Setup all constants.
 *
 * @since 1.0.0
 *
 * @return void
 */
function setup_constants() {

	// get_file_data should always be available. We leave this check just in case
	if ( ! function_exists( 'get_file_data' ) ) {
		require_once ABSPATH . 'wp-includes/functions.php';
	}

	/** @var array $default_headers list of headers that we want to get in the format array('HeaderKey => 'Header Name')*/
	$default_headers = [
		'TextDomain' => 'Text Domain',
		'Version'    => 'Version',
	];

	/** @var array $plugin_data the headers extracted */
	$plugin_data = get_file_data( __FILE__, $default_headers );

	define( __NAMESPACE__ . '\PLUGIN_VERSION', $plugin_data['Version'] );
	define( __NAMESPACE__ . '\PLUGIN_NAME', $plugin_data['TextDomain'] );
	define( __NAMESPACE__ . '\PLUGIN_URL_PATH', plugins_url( '/', __FILE__ ) );
	define( __NAMESPACE__ . '\PLUGIN_DIR_PATH', WP_PLUGIN_DIR . '/' . plugin_basename( dirname( __FILE__ ) ) . '/' );
	define( __NAMESPACE__ . '\PLUGIN_SLUG', plugin_basename( dirname( __FILE__ ) ) );
}

register_activation_hook( __FILE__, __NAMESPACE__ . '\activate_plugin' );
/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-activator.php
 *
 * @since 1.0.0
 *
 * @return void
 */
function activate_plugin() {
	require_once PLUGIN_DIR_PATH . 'includes/class-activator.php';
	includes\Activator::activate();
}

register_deactivation_hook( __FILE__, __NAMESPACE__ . '\deactivate_plugin' );
/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-deactivator.php
 *
 * @since 1.0.0
 *
 * @return void
 */
function deactivate_plugin() {
	require_once PLUGIN_DIR_PATH . 'includes/class-deactivator.php';
	includes\Deactivator::deactivate();
}

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require PLUGIN_DIR_PATH . 'includes/class-loader.php';

/**
 * Returns the timestamp of the file to use it as version number for the asset.
 * Every time that we save the file the timestamp is updated
 * and therefore the asset version changes, making the debug easier.
 *
 * @since 1.0.0
 *
 * @param string $asset_file complete path to the asset file (not to confuse with the URL)
 *
 * @return int The asset timestamp
 */
function get_asset_version( $asset_file ) {

	/** @var int $version the timestamp of the asset file */
	$asset_version = filemtime( $asset_file );

	// detect the case where a Windows server returns the wrong encoding and convert
	if ( $asset_version === false ) {
		$asset_version = filemtime( utf8_decode( $asset_file ) );
	}

	return $asset_version;
}

/** The main class responsible for internationalization and instantiating all other classes */
new includes\Loader();