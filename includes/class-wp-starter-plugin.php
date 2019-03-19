<?php

namespace dapre_wpsp\includes;

// If this file is called directly, abort.
if ( ! defined( 'ABSPATH' ) ) {
	die;
}

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    dapre_wpsp
 * @subpackage dapre_wpsp/includes
 * @author     Giulio Daprela <giulio.daprela@gmail.com>
 */
class Dapre_Wpsp {

	/**
	 * Define the core functionality of the plugin.
	 *
	 * Load the dependencies, define the locale, and set the hooks for the admin area and
	 * the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function __construct() {

		spl_autoload_register( [ $this, 'autoload' ] );

		$this->load_dependencies();
		$this->set_locale();
		$this->define_hooks();

	}

	/**
	 * Load the required dependencies for this plugin. Classes files are loaded by the autoloader
	 *
	 * @since    1.0.0
	 * @access   private
	 *
	 * @return void
	 */
	private function load_dependencies() {

		/**
		 * The file containing utility functions that don't logically belong to any class or we want to keep out
		 */
		require_once \dapre_wpsp\PLUGIN_DIR_PATH . 'includes/functions.php';

	}

	/**
	 * Class autoloader method
	 *
	 * @param string $class class name which also includes the namespace
	 *
	 * @return void
	 */
	private function autoload( $class ) {

		$class_path = strtolower( str_replace( "_", "-", $class ) );

		$paths = explode( '\\', $class_path );

		if ( $paths[0] != \dapre_wpsp\PLUGIN_NAME ) {
			return;
		}

		$class_file = \dapre_wpsp\PLUGIN_DIR_PATH . "$paths[1]/class-{$paths[2]}.php";

		if ( file_exists( $class_file ) ) {
			include_once( $class_file );
		}  else {
			$abstract_class_file = \dapre_wpsp\PLUGIN_DIR_PATH . "$paths[1]/abstract-class-{$paths[2]}.php";
			if ( file_exists($abstract_class_file) ) {
				include_once($abstract_class_file);
			}
		}
	}

	/**
	 * Define the locale for this plugin for internationalization.
	 *
	 * Uses the i18n class in order to set the domain and to register the hook
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 *
	 * @return void
	 */
	private function set_locale() {

		$plugin_i18n = new i18n();

		add_action( 'plugins_loaded', [ $plugin_i18n, 'load_plugin_textdomain' ] );
	}

	/**
	 * Register all of the hooks related to the admin area functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 *
	 * @return void
	 */
	private function define_hooks() {

		$start_here = new Start_Here();

		add_action( 'admin_enqueue_scripts', [ $start_here, 'enqueue_styles' ] );
		add_action( 'admin_enqueue_scripts', [ $start_here, 'enqueue_scripts' ] );
	}
}
