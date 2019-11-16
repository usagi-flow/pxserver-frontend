const path = require("path");
const webpack = require('webpack');
const HTMLWebpackPlugin = require("html-webpack-plugin");
const helper = require('./webpack.helper');
const externals = require("webpack-node-externals");

const outputDirectory = "lib";

const serverConfig = {
	target: "node",
	mode: "development",
	devtool: "inline-source-map",
	entry: {
		"server": "./server/start.ts"
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loaders: [
					{
						loader: "ts-loader",
						options: { configFile: "tsconfig.server.json" }
					}
				],
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
		alias: {
			"hiredis": path.resolve(__dirname, "server", "helpers", "hiredis.js")
		}
	},
	output: {
		path: path.resolve(__dirname, outputDirectory),
		filename: "server.js",
		library: "server",
		libraryTarget: "umd"
	},
	node: {
		// Do not let Webpack change these globals
		__dirname: false,
		__filename: false,
	},
	externals: [externals()]
};

const clientConfig = {
	target: "web",
	mode: "development",
	devtool: "inline-source-map",
	entry: {
		"polyfills": "./client/polyfills.ts",
		"vendor": "./client/vendor.ts",
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
		path: path.resolve(__dirname, outputDirectory, "public"),
		filename: "[name].bundle.js",
		chunkFilename: '[name].bundle.js'
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: path.resolve(__dirname, "client", "index.html")
		})
	],
	optimization: {
		splitChunks: {
			chunks: "all"
		}
	}
};

module.exports = [ serverConfig, clientConfig ];