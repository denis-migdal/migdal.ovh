let {list_html_index_files} = require('prehtml-loader/webpack_helper.js');


module.exports = function(is_production, path_suffix) {

	let pages = list_html_index_files('./src/pages');
	//TODO...

	let base_url = is_production ? 'https://migdal.ovh/'
								 : `file://${__dirname}/../dist/${path_suffix}/`;


	return {

		pages_output_dir: `./dist/${path_suffix}/`, // optionnal
		pages: {
			"": {
				__src: './src/homepage',
				__args: { base_url }
			}
		}
	};
}