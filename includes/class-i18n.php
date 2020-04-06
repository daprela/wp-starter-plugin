<?php

namespace DapreWpsp\Includes;

use const DapreWpsp\PLUGIN_DIR_PATH;
use const DapreWpsp\PLUGIN_NAME;

// If this file is called directly, abort.
if ( ! defined( 'ABSPATH' ) ) {
	die;
}

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    DapreWpsp
 * @subpackage DapreWpsp\Includes
 * @author     Giulio Daprela <giulio.daprela@gmail.com>
 */
class i18n {

	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			PLUGIN_NAME,
			false,
			PLUGIN_DIR_PATH . 'languages/'
		);

	}
}