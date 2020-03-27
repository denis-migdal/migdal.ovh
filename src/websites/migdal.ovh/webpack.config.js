const CopyPlugin = require('copy-webpack-plugin');

module.exports = (type, build, env, argv) => {

	let configs = require(env.SKLT_WEBPACK_DIR + 'subproject_types/' + type + '.config.js')(type, build, env, argv);


	let config = configs[configs.length - 1];

	config.plugins = config.plugins || [];

	config.plugins.push( new CopyPlugin([{
		from: '**', to: '.', context: env.PROJECT_DIR + '/src/' + type + '/' + build + '/static/'
	}]) );

	return configs;
};