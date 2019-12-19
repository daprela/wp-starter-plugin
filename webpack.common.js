const blocksCSSPlugin = require("mini-css-extract-plugin");
const editBlocksCSSPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: {
		"./assets/js/editor.blocks.min": "./blocks/editor.blocks.js",
		'./assets/js/frontend.blocks.min' : './blocks/frontend.blocks.js',
		// If you want to add the two following lines to compile JS with Webpack and replace Gulp,
		// you must also remember to import CSS and image files in the JS or Webpack will ignore them.
		//'./assets/js/admin.min' : './src/js/admin.js',
		//'./assets/js/frontend.min' : './src/js/frontend.js',
	},
	plugins: [
		new blocksCSSPlugin({ filename: "./assets/css/blocks.style.min.css" }),
		new editBlocksCSSPlugin({ filename: "./assets/css/blocks.editor.min.css" }),
	],
	module: {
		rules: [
			{
				test: /\.(svg|png|jpg|gif)$/,
				use: {
					loader: "file-loader",
					options: {
						name: "[name].[ext]",
						outputPath: ".assets/images"
					}
				}
			}
		]
	},
};
