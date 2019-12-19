<?php
/**
 * The class that enqueues and manages the Gutenberg blocks.
 *
 * @package dapre_wpsp
 * @since   1.0.0
 * @author  Giulio Daprela
 * @link    https://giuliodaprela.com
 * @license GPL 2.0+
 */

namespace dapre_wpsp\includes;

use function dapre_wpsp\get_asset_version;
use const dapre_wpsp\PLUGIN_DIR_PATH;
use const dapre_wpsp\PLUGIN_NAME;
use const dapre_wpsp\PLUGIN_URL_PATH;

class Blocks {

	public function editor_scripts() {
		// Make paths variables so we don't write em twice ;)
		$blockPath = 'assets/js/editor.blocks.min.js';
		$editorStylePath = 'assets/css/blocks.editor.min.css';

		$version = get_asset_version( PLUGIN_DIR_PATH . $blockPath );
		// Enqueue the bundled block JS file
		wp_enqueue_script(
			PLUGIN_NAME . '-blocks-js',
			PLUGIN_URL_PATH . $blockPath,
			[ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-editor' ],
			$version,
			false );

		$version = get_asset_version( PLUGIN_DIR_PATH . $editorStylePath );
		// Enqueue optional editor only styles
		wp_enqueue_style(
			PLUGIN_NAME . '-blocks-editor-css',
			PLUGIN_URL_PATH . $editorStylePath,
			[],
			$version,
			'all'
		);
	}

	public function frontend_scripts() {
		// Make paths variables so we don't write em twice ;)
		$blockPath = 'assets/js/frontend.blocks.min.js';
		$frontendStylePath = 'assets/css/blocks.style.min.css';

		$version = get_asset_version( PLUGIN_DIR_PATH . $blockPath );
		// Enqueue the bundled block JS file
		wp_enqueue_script(
			PLUGIN_NAME . '-blocks-frontend-js',
			PLUGIN_URL_PATH . $blockPath,
			[ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-api', 'wp-editor' ],
			$version,
			false );

		$version = get_asset_version( PLUGIN_DIR_PATH . $frontendStylePath );
		// Enqueue optional editor only styles
		wp_enqueue_style(
			PLUGIN_NAME . '-blocks-frontend-css',
			PLUGIN_URL_PATH . $frontendStylePath,
			[],
			$version,
			'all'
		);
	}
}