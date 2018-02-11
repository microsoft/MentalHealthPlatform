var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
	template: __dirname + '/app/index.html',
	filename: 'index.html',
	inject: 'body'
});

module.exports = {
	entry: __dirname + '/app/index.js',
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},
	output: {
		filename: 'transformed.js',
		path: __dirname + '/build'
	},
	devServer: {
		historyApiFallback: true
	},
	plugins: [HTMLWebpackPluginConfig],
	node: {
		console: 'empty',
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		console: true
	}
};