const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const helper = require("./webpack.helper");
const externals = require("webpack-node-externals");

const outputDirectory = "lib";

const serverConfig = {
	target: "node",
	mode: "development",
	devtool: "inline-source-map",
	entry: {
		"server": helper.getPath("./server/main.ts")
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
		path: path.resolve(".", outputDirectory),
		filename: "main.js",
		library: "main",
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
		"polyfills": helper.getPath("./client/polyfills.ts"),
		"vendor": helper.getPath("./client/vendor.ts"),
		"app": helper.getPath("./client/main.ts")
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loaders: [
					{
						loader: "ts-loader",
						options: { configFile: "tsconfig.client.json" }
					}
				],
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				use: [
					"style-loader",
					"css-loader",
					"sass-loader"
				]
			}
		]
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"]
	},
	output: {
		path: path.resolve(".", outputDirectory, "public"),
		filename: "[name].bundle.js",
		chunkFilename: "[name].bundle.js"
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: helper.getPath("./client/index.html")
		})
	],
	optimization: {
		splitChunks: {
			chunks: "all"
		}
	}
};

let config = [ serverConfig, clientConfig ];
config.getServerConfig = () => {
	return serverConfig;
};
config.getClientConfig = () => {
	return clientConfig;
};
module.exports = config;