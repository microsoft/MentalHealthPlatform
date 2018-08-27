var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
	template: __dirname + '/src/index.html',
	filename: 'index.html',
	inject: 'body'
});

module.exports = {
	entry: __dirname + '/src/index.js',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
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
	output: {
		filename: 'transformed.js',
		path: __dirname + '/build/',
		publicPath: '/'
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