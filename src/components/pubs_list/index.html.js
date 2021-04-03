let {component_builder} = require('prehtml-loader/preproc_helper.js');


const pub_types = require('../pub_summary/pubtypes.json');

let publications = require('../../pages/publications/data.json');
publications = Object.entries(publications);


function getLinks(pub) {


	let links = {};

	let pub_content = ['pdf', 'doi', 'hal', 'src', 'cite'];

	if( pub.content.hal != null ) {
		let hal_url = "https://hal.archives-ouvertes.fr/" + pub.content.hal + '/';
		pub.content['hal-url'] = hal_url;
		pub.content['hal-cite'] = hal_url + 'bibtex';
		pub.content['hal-pdf'] = hal_url + 'document';
	}

	for(let content of pub_content) {

		let cname = content;
		if(cname == 'hal')
			cname = 'hal-url';

		let cvalue = pub.content[cname] ?? pub.content['hal-' + cname] ?? null;

		if(cvalue)
			links[content] = cvalue;
	}

	return links;
}

module.exports = {

	prerender: ($, options) => {

		let target = $('div');
		
		for(let type_id in pub_types) {

			let type_name = pub_types[type_id];

			let pubs = publications.filter( e => e[1].content.type === type_id);

			let pub_elems = [];
			for(let [pubid, pub] of pubs)
				pub_elems.push( component_builder($, './pubs_cat_list_item',
				{
					id: pubid,
					authors: pub.authors,
					title: pub.title,
					abstract: pub.abstract ?? '',
					conf: pub.conf,
					links: getLinks(pub)
				}) );

			target.append( component_builder($, './pubs_cat_list', {type_id, type_name}, pub_elems) );
		}
	}

}