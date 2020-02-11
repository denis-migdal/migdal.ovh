const path = require('path');

module.exports = {

	entry: {
		main: './src/main.js'
	},
	output:{
		filename: 'js/[name].bundle.js',
		path: path.resolve(__dirname, 'www')
	},
	devtool: 'source-map'
};