const path = require("path");
const webpack = require('webpack');
const HTMLWebpackPlugin = require("html-webpack-plugin");
const helper = require('./webpack.helper');

module.exports = {
	mode: "development",
	devtool: "inline-source-map",
	entry: {
		"polyfills": "./client/polyfills.ts",
		//"vendor": "./client/vendor.ts",
		"app": "./client/main.ts"
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loaders: [
					{
						loader: "ts-loader",
						options: { configFile: "tsconfig.client.json" }
					},
					"angular2-template-loader",
					"angular-router-loader",
				],
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"]
	},
	output: {
		path: path.resolve(__dirname, "run", "public"),
		filename: "[name].js"
	},
	plugins: [
		// Workaround for angular/angular#11580
		new webpack.ContextReplacementPlugin(
			// The (\\|\/) piece accounts for path separators in *nix and Windows
			/angular(\\|\/)core(\\|\/)@angular/,
			helper.root('./src'), // location of your src
			{} // a map of your routes
		),
		/*new webpack.optimize.CommonsChunkPlugin({
			name: ['app', 'vendor', 'polyfills']
		}),*/
		new HTMLWebpackPlugin({ template: "client/index.html" })
	]
};