import * as path from "path";
import WebpackHelper from "./webpack.helper";
import * as webpack from "webpack";

const externals = require("webpack-node-externals");

const HTMLWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');

export class WebpackConfiguration
{
	protected readonly libOutputDirectory : string = "lib";
	protected readonly appOutputDirectory : string = "dist";

	protected application : boolean = true;

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

	public getOutputDirectory() : string
	{
		return this.application ? this.appOutputDirectory : this.libOutputDirectory;
	}

	public getServerEntry() : webpack.Entry
	{
		let entry : webpack.Entry = {};

		if (this.isApplication())
			entry["Server"] = WebpackHelper.getPath("./server/main.ts");
		else
			entry["Server"] = WebpackHelper.getPath("./server/module.ts");

		return entry;
	}

	public getClientEntry() : webpack.Entry
	{
		let entry : webpack.Entry = {};

		entry["polyfills"] = WebpackHelper.getPath("./client/polyfills.ts");
		entry["app"] = WebpackHelper.getPath("./client/main.ts");

		return entry;
	}

	protected getServerOutput() : webpack.Output
	{
		let output : webpack.Output = {};

		output.path = path.resolve(".", this.getOutputDirectory());

		if (this.isApplication())
		{
			output.filename = "main.js";
			output.library = "main";
			output.libraryTarget = "umd";
		}
		else
		{
			output.filename = "module.js";
			output.library = "module";
			output.libraryTarget = "umd";
		}

		return output;
	}

	protected getClientOutput() : webpack.Output
	{
		let output : webpack.Output = {};

		output.path = path.resolve(".", this.getOutputDirectory(), "public");
		output.filename = "[name].bundle.js";
		output.chunkFilename = "[name].bundle.js";

		return output;
	}

	public getServerConfig() : webpack.Configuration
	{
		return {
			target: "node",
			mode: "development",
			devtool: "inline-source-map",
			entry: this.getServerEntry(),
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
			output: this.getServerOutput(),
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
			entry: this.getClientEntry(),
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
			output: this.getClientOutput(),
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