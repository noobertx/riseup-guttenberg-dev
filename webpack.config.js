const defaultConfig = require("@wordpress/scripts/config/webpack.config.js");
const path = require("path");
const IgnoreEmitPlugin = require("ignore-emit-webpack-plugin");
module.exports = {
	...defaultConfig,
	module: {
		rules: [
		  {
			test: /\.s[ac]ss$/i,
			use: [
			  // Creates `style` nodes from JS strings
			  'style-loader',
			  // Translates CSS into CommonJS
			  'css-loader',
			  // Compiles Sass to CSS
			  'sass-loader',
			],
		  },
		  {
			test: /\.js$/,
			exclude: /node_modules/,
			use: [
				require.resolve( 'thread-loader' ),
				{
					loader: require.resolve( 'babel-loader' ),
					options: {
						// Babel uses a directory within local node_modules
						// by default. Use the environment variable option
						// to enable more persistent caching.
						cacheDirectory: process.env.BABEL_CACHE_DIRECTORY || true,

						// Provide a fallback configuration if there's not
						// one explicitly available in the project.
						
					},
				},
			],
		},
		],
	},
	performance: {
		maxEntrypointSize: 4000000,
		maxAssetSize: 4000000
	},
	
	entry: {
		index: path.resolve(process.cwd(), "src", "blocks.js")
	},
	plugins: [
		...defaultConfig.plugins,
		new IgnoreEmitPlugin(["blocks.build.asset.php", "blocks.build.js.map"])
	],
	output: {
		filename: "blocks.build.js"
	}
};
