
function show_publication(target, pub, $) {

	show_icons(target, pub, $);
	show_details(target, pub, $);
	target.append('<br/>');
	show_links(target, pub, $);
	show_related(target, pub, $);
}

function show_demos(target, resources, $) {

	let keys = Object.keys(resources).filter( e => e.endsWith('-demos') );;

	let content = $('<div></div>');
	content.addClass('demo-lst');

	for(let key of keys) {
		let res = resources[key];

		content.append('<a href="'+ res.url +'">'+ res.title +'</a>');
	}


	target.append(content);
}

function show_summary(target, publications, pub_types, $) {

	target.addClass('pub_sum');

	let list;
	let i = 0;

	for(let type_id in pub_types) {
		let type_name = pub_types[type_id];

		if(i++ % 2 == 0) {
			list = $('<ul></ul>');
			target.append(list);
		}

		let pubs = Object.keys(publications).filter( e => publications[e].content.type == type_id);
		let elem = $('<li><a href="/publications/'+ type_id +'">'+ type_name +':  '+ pubs.length +'</a></li>');

		list.append(elem);

	}

}


module.exports = {
	show_publication: show_publication,
	show_demos: show_demos,
	show_summary: show_summary
};


/***********************************************/


function show_icons(target, pub, $) {
	show_warning(target, pub, $);
	show_awards(target, pub, $);
}

function show_warning(target, pub, $) {

	//TODO pub_warning($pub) 
}

function show_awards(target, pub, $) {

	if( pub.awards )
		target.append('<span class="glyphicon glyphicon-award" title="'+ pub.awards +'"></span>');
}

function show_details(target, pub, $) {

	show_title(target, pub, $);
	target.append(', ');

	show_authors(target, pub, $);
	target.append(', ');

	let publisher = $('<strong></strong>');
	show_publisher(publisher, pub, $);
	target.append(publisher);
	target.append(', ');

	show_place(target, pub, $);
}

function show_links(target, pub, $) {

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

		let cvalue = pub.content[cname] || pub.content['hal-' + cname] || null;

		pub_print_link(target, content, cvalue, $);
	}
}


let related_ressources = ['slides', 'poster', 'demo', 'video', 'paper'];
let related_langs = ['en', 'fr', 'it', 'conf.', 'journal'];

function show_related(target, pub, $) {

	let list = $('<span></span>');
	list.addClass('pull-right');


	let childs = [];

	for(let rres of related_ressources) {

		let related = find_related(pub, rres);

		if(related)
			childs.push( build_link(rres, related.page, related.id, $) );
	}

	for(let rlang of related_langs) {

		let related = find_related(pub, rlang);
		if(related)
			childs.push( build_link(rlang, related.page, related.id, $) );
	}

	if(childs.length) {
		list.append('<i>see also</i> ');
		list.append(...childs);
	}

	target.append(list);
}


const resources = require('./../json/resources.json');
const publications = require('./../json/publications.json');

function find_related(pub, key) {

	let id = pub.id;

	if(pub.langs && pub.langs[key]) {
		let result = publications[pub.langs[key]];
		result.id = pub.langs[key];
		result.page = 'publications';
		return result;
	}

	if(key == 'paper') {

		id = id.split('-').slice(0, -1).join('-');

		let paper = publications[id];
		if(paper) {
			paper.id = id;
			paper.page = 'publications';
			return paper;
		}

		return null;
	}

	let res = resources[id + '-' + key];
	if(res) {

		res.id = id + '-' + key;
		res.page = 'resources';
		return res;
	}

	return null;
}


function build_link(name, page, id, $) {

	let link = $('<a></a>');

	link.attr('title', name);
	link.attr('href', '/' + page + '/' + id);
	link.append('<span class="logo vat_logo">['+ name +']</span>');

	return link;
}

function pub_print_link(target, name, value, $) { // page argument

	if(value == null)
		return;

	let link = $('<a><span class="logo vat_logo">['+ name +']</span></a>');
	link.addClass('functions_mlr_1px');
	link.attr('href', value);
	link.attr('title', name);

	target.append(link);
}


function show_title(target, pub, $) {

	let page = pub.type == 'paper' ? 'publications' : 'resources';

	target.append('<strong><a href="/' + page + '/'+ pub.id + '" title="'+ (pub.abstract || '') +'">'+ pub.title +'</a></strong>');
}



function show_authors(target, pub, $) {

	let authors = pub.authors.slice();

	for(let i in authors)
		if(authors[i] == 'Denis Migdal')
			authors[i] = '<em>'+ authors[i] +'</em>';

	target.append( authors.join(', ') );
}


function show_publisher(target, pub, $) {

	if(pub.conf) {

		let link = $('<a></a>');

		link.attr('href', pub.conf.url);
		link.attr('title', pub.conf.type + '\nRank: ' + pub.conf.rank + '\nAccept. rate: ' + pub.conf['accept-rate']);
		link.text( pub.conf.name + ( pub.conf.rank != 'N/A' ? ' (' + pub.conf.rank + ')' : '' ) );
		// if true : link.addClass('atext');


		target.append(link);

		return;
	}


	target.append( pub.publisher.name );
}


function show_place(target, pub, $) {

	target.append( (pub.conf || pub.publisher).date ); // ", " . pub.place;
}