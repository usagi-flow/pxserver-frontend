import * as path from "path";
import WebpackHelper from "./webpack.helper";
import * as webpack from "webpack";

/*const path = require("path");
const WebpackHelper = require("./webpack.helper");*/

const externals = require("webpack-node-externals");

const HTMLWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');

export class WebpackConfiguration
{
	protected readonly libOutputDirectory : string = "lib";
	protected readonly appOutputDirectory : string = "dist";

	protected application : boolean = true;

	public getOutputDirectory() : string
	{
		return this.application ? this.appOutputDirectory : this.libOutputDirectory;
	}

	public setLibrary() : WebpackConfiguration
	{
		this.application = false;
		return this;
	}

	public isLibrary() : boolean
	{
		return !this.application;
	}

	public setApplication() : WebpackConfiguration
	{
		this.application = true;
		return this;
	}

	public isApplication() : boolean
	{
		return this.application;
	}

	public getServerConfig() : webpack.Configuration
	{
		return {
			target: "node",
			mode: "development",
			devtool: "inline-source-map",
			entry: {
				"server": WebpackHelper.getPath("./server/module.ts")
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
				path: path.resolve(".", this.getOutputDirectory()),
				filename: "module.js",
				library: "module",
				libraryTarget: "umd"
			},
			node: {
				// Do not let Webpack change these globals
				__dirname: false,
				__filename: false,
			},
			externals: [externals()]
		};
	}

	public getClientConfig() : webpack.Configuration
	{
		return {
			target: "web",
			mode: "development",
			devtool: "inline-source-map",
			entry: {
				"polyfills": WebpackHelper.getPath("./client/polyfills.ts"),
				"app": WebpackHelper.getPath("./client/main.ts")
			},
			module: {
				rules: [
					{
						test: /\.tsx?$/,
						loaders: [
							{
								loader: "ts-loader",
								options: {
									configFile: "tsconfig.client.json",
									appendTsSuffixTo: [/\.vue$/]
								}
							}
						],
						exclude: /node_modules/
					},
					{
						test: /\.scss$/,
						use: [
							"vue-style-loader",
							"css-loader",
							"sass-loader"
						]
					},
					{
						test: /\.vue$/,
						loader: "vue-loader",
						options: {
							esModule: true
						}
					}
				]
			},
			resolve: {
				extensions: [".tsx", ".ts", ".js", "*.vue"],
				alias: {
					"vue$": "vue/dist/vue.esm.js"
				}
			},
			output: {
				path: path.resolve(".", this.getOutputDirectory(), "public"),
				filename: "[name].bundle.js",
				chunkFilename: "[name].bundle.js"
			},
			plugins: [
				new HTMLWebpackPlugin({
					template: WebpackHelper.getPath("./client/index.html")
				}),
				new VueLoaderPlugin()
			],
			optimization: {
				splitChunks: {
					chunks: "all"
				}
			}
		};
	}

	public get() : webpack.Configuration[]
	{
		return [this.getServerConfig(), this.getClientConfig()];
	}
}

export default new WebpackConfiguration().setLibrary().get();