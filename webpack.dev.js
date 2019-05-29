const nodeExternals = require('webpack-node-externals');
const path = require('path');

const serverConfigure = {
	resolve: {
		extensions: ['.js', '.json'],
	},

	entry: {
		filename: "./src/main.js"
	},
	output: {
		path: path.resolve(__dirname),
		filename: 'server.js'
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: [path.resolve(__dirname, 'node_modules')],
				options: {
					plugins: ['syntax-dynamic-import'],
					presets: ['@babel/preset-env']
				}
				
			}
		]
	},
	mode: "development",
	target: 'node',
	context: path.resolve(__dirname),
	node : {
		__dirname : true,
		__filename : true
	},
	externals: nodeExternals()
}
module.exports = [serverConfigure];
