let {component_builder} = require('prehtml-loader/preproc_helper.js');


const pub_types = require('./pubtypes.json');


let publications = require('../../pages/publications/data.json');

publications = Object.values(publications);

module.exports = {

	prerender: ($, options) => {

		let target = $('.pub_sum')
		
		let i = 0;
		let list;

		for(let type_id in pub_types) {

			let type_name = pub_types[type_id];

			if(i++ % 2 == 0) {
				list = $('<ul></ul>');
				target.append(list);
			}

			let pubs = publications.filter( e => e.content.type === type_id);

			list.append( component_builder($, './item', {id: type_id, name: type_name, count: pubs.length} ) );

		}
	}
};