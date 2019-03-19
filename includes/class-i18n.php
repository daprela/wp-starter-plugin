<?php

namespace dapre_wpsp\includes;

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       https://giuliodaprela.com
 * @since      1.0.0
 *
 * @package    dapre_wpsp
 * @subpackage dapre_wpsp/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    dapre_wpsp
 * @subpackage dapre_wpsp/includes
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
			\dapre_wpsp\PLUGIN_NAME,
			false,
			\dapre_wpsp\PLUGIN_DIR_PATH . 'languages/'
		);

	}
}
