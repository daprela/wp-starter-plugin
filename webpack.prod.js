const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const blocksCSSPlugin = require("mini-css-extract-plugin");
const editBlocksCSSPlugin = require("mini-css-extract-plugin");


module.exports = merge(common, {
	mode: "production",
	output: {
		path: path.resolve(__dirname),
		filename: "[name].js"
	},
	optimization: {
		minimizer: [
			new OptimizeCssAssetsPlugin(),
			new TerserPlugin(),
		]
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@wordpress/default"],
						plugins: [
							[
								"@babel/transform-react-jsx",
								{ pragma: "wp.element.createElement" }
							],
							["transform-react-remove-prop-types",
								{
								mode: "wrap",
								ignoreFilenames: ["node_modules"]
								}
							]
						]
					}
				}
			},
			{
				test: /style\.s?css$/,
				use: [
					blocksCSSPlugin.loader, //3. Extract css into files
					"css-loader", //2. Turns css into commonjs
					"sass-loader" //1. Turns sass into css
				]
			},
			{
				test: /editor\.s?css$/,
				use: [
					editBlocksCSSPlugin.loader, //3. Extract css into files
					"css-loader", //2. Turns css into commonjs
					"sass-loader" //1. Turns sass into css
				]
			},
		]
	}
});
