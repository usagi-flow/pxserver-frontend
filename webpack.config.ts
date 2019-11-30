import * as webpack from "webpack";
import { WebpackConfiguration } from "pxserver-core/webpack.config";

const HTMLWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');

export class FrontendConfiguration extends WebpackConfiguration
{
	public constructor()
	{
		super();
		this.extendSearchPath(__dirname);
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
					template: this.getPath("./client/index.html")
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

export default new FrontendConfiguration().setHybrid().get();