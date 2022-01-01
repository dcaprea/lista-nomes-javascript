const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports =  {
	mode: 'development',
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'main.js',
	},
	devServer: {
		compress: true,
		contentBase: './dist',
		port: 9000
	},
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/index.html'},
				{
					// When copying files starting with a dot, must specify the toType option
					// toType: "file",
					to({ context, absoluteFilename }) {
					  return `./assets/${path.relative(context, absoluteFilename)}`;
					},
					from: "./src/assets",
				  },
            ]
        })
    ]
}