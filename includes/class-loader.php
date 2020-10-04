<?php

namespace DapreWpsp\Includes;

use const DapreWpsp\PLUGIN_DIR_PATH;
use const DapreWpsp\PLUGIN_LONG_NAME;

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
 * @since      1.0.0
 * @package    DapreWpsp
 * @subpackage DapreWpsp\Includes
 * @author     Giulio Daprela <giulio.daprela@gmail.com>
 */
class Loader {

	/** @var object $admin */
	public $admin;

	/** @var object $plugin_public */
	public $plugin_public;

	/** @var object $plugin_i18n The internationalization class */
	public $plugin_i18n;

	/** @var object $blocks The blocks class */
	public $blocks;

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

		/* These properties must be declared public.
		 * Please pay attention at where these classes are instantiated.
		 * They must be after the class autoloader and before the hooks are called.
		 */
		$this->admin         = new Admin();
		$this->plugin_public = new Plugin_Public();
		$this->plugin_i18n   = new i18n();
		$this->blocks        = new Blocks();

		$this->load_dependencies();
		$this->set_locale();

		if ( $this->is_php_version_ok() ) {
			$this->register_hooks();
		} else {
			add_action( 'admin_notices', [ $this, 'required_php_version_print_notice' ] );
		}
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
		 * The file containing utility functions that don't logically belong to any class or we want to keep out.
		 */
		require_once PLUGIN_DIR_PATH . 'includes/functions.php';

	}

	/**
	 * Class autoloader method.
	 *
	 * @param string $class class name which also includes the namespace.
	 *
	 * @return void
	 */
	private function autoload( string $class ) {

		/** @var string $class_dir_path the path where the class file is found */
		$class_dir_path = strtolower( str_replace( "_", "-", $class ) );
		$dir_paths = explode( '\\', $class_dir_path );

		/** @var array $paths The class namespace path */
		$paths = explode( '\\', $class );
		$namespace = explode( '\\',__NAMESPACE__);

		if ( $paths[0] != $namespace[0] ) {
			return;
		}

		/** @var string $class_file The path to the file containing the class called */
		$class_file = PLUGIN_DIR_PATH . "$dir_paths[1]/class-{$dir_paths[2]}.php";

		if ( file_exists( $class_file ) ) {
			include_once( $class_file );
		}  else {
			/** @var string $abstract_class_file */
			$abstract_class_file = PLUGIN_DIR_PATH . "$dir_paths[1]/abstract-class-{$dir_paths[2]}.php";
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
		add_action( 'plugins_loaded', [ $this->plugin_i18n, 'load_plugin_textdomain' ] );
	}

	/**
	 * Register all of the hooks.
	 *
	 * @since    1.0.0
	 * @access   private
	 *
	 * @return void
	 */
	private function register_hooks() {

		// enqueuing admin styles
		add_action( 'admin_enqueue_scripts', [ $this->admin, 'enqueue_styles' ] );
		// enqueuing admin scripts
		add_action( 'admin_enqueue_scripts', [ $this->admin, 'enqueue_scripts' ] );

		// enqueuing frontend styles
		add_action( 'wp_enqueue_scripts', [$this->plugin_public, 'enqueue_styles'] );
		// enqueuing frontend scripts
		add_action( 'wp_enqueue_scripts', [$this->plugin_public, 'enqueue_scripts'] );

		// enqueuing Gutenberg editor assets
		add_action( 'enqueue_block_editor_assets', [$this->blocks, 'editor_scripts'] );
		// enqueuing Gutenberg frontend assets
		add_action( 'enqueue_block_assets', [$this->blocks, 'frontend_scripts'] );
	}

	/**
	 * Checks if the PHP version installed on the server is compatible with the plugin
	 *
	 * @return   boolean   True if the version is good
	 */
	public function is_php_version_ok(): bool {
		if ( version_compare( PHP_VERSION, '7.0.0', '<' ) ) {
			return false;
		}

		return true;
	}

	/**
	 * Prints the notice in case the PHP version doesn't meet the minimum requirements
	 */
	public function required_php_version_print_notice() {
		?>
		<div class="notice notice-error is-dismissible">
			<p>The plugin <?php echo PLUGIN_LONG_NAME ?> requires PHP Version 7.0.0 or greater.</p>
		</div>
		<?php
	}
}
