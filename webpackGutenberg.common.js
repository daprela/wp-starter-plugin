const blocksCSSPlugin = require("mini-css-extract-plugin");
const editBlocksCSSPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: {
		"./assets/js/editor.blocks.min": "./blocks/editor.blocks.js",
		'./assets/js/frontend.blocks.min' : './blocks/frontend.blocks.js',
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
