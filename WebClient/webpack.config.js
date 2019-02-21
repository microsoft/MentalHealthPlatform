var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
	template: __dirname + '/src/index.html',
	filename: 'index.html',
	inject: 'body'
});

module.exports = {
	entry: './src/index.tsx',
	resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
	},
	mode: "development",
	// Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
	output: {
        filename: "bundle.js",
		path: __dirname + "/dist",
		publicPath: "/"
    },
	module: {
		rules: [
			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.(tsx?|jsx?)$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{ enforce: "pre", test: /\.jsx?$/, loader: "source-map-loader" },
			
			{
				test: /\.(png|jpg|gif)$/,
				use: 'file-loader'
			},
			{	
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
							localIdentName: '[name]__[local]___[hash:base64:5]'
						}
					}
				]
			}
		]
	},
	devServer: {
		historyApiFallback: true,
		publicPath: "/"
	},
	plugins: [HTMLWebpackPluginConfig],
	// node: {
	// 	console: 'empty',
	// 	fs: 'empty',
	// 	net: 'empty',
	// 	tls: 'empty',
	// 	console: true
	// }
};