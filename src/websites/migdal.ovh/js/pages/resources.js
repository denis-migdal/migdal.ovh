const resources = require('./../../json/resources.json');

const PubUtils = require('../publication.js');

module.exports = (html, $) => {

	fill_summary(html.find('#res_summary'), $);

	fill_res( html.find('#ress_content'), $);

};


let res_types = {
	"demos": "Online demonstrations",
	"video": "Videos",
	"poster": "Posters",
	"slides": "Slides",
	"TR": "Technical Reports"
};

function fill_summary(target, $) {

	target.addClass('pub_sum');

	let list;
	let i = 0;

	console.log(resources);

	for(let type_id in res_types) {
		let type_name = res_types[type_id];

		if(i++ % 2 == 0) {
			list = $('<ul></ul>');
			target.append(list);
		}

		let pubs = Object.keys(resources).filter( e => e.endsWith('-' + type_id) );
		let elem = $('<li><a href="/resources/'+ type_id +'">'+ type_name +':  '+ pubs.length +'</a></li>');

		list.append(elem);

	}

}




function fill_res(target, $) {

	for(let type_id in res_types) {
		let type_name = res_types[type_id];

		let div = $('<div></div>');
		div.addClass("img-rounded hrl1");
		div.attr('id', type_id);

		div.append('<hr class="hrtop"/>');

		let subdiv = $('<div></div>');
		subdiv.addClass('hrl2');

		subdiv.append('<h2 class="title"><a href="#" class="glyphicon glyphicon-arrow-up scrolltop_btn" title="Go to top"></a> '+ type_name +'</h2>');


		if(type_id == 'demos')
			PubUtils.show_demos(subdiv, resources, $);
		else {
			continue;

			
			let pubs = Object.keys(resources).filter( e => e.endsWith('-' + type_id) );
			show_resources(subdiv, resources, pubs, $);
		}

		div.append(subdiv);

		div.append('<hr class="hrbottom"/>');

		target.append(div);
	}
}


function show_resources(elem, resources, pubs, $) {

	let list = $('<ul></ul>');

	for(let id of pubs) {

		let publication = resources[id];
		publication.id = id;

		let elem = $('<li></li>');
		elem.addClass('img-rounded resources_item');
		elem.attr('id', id);

		PubUtils.show_publication(elem, publication, $);
		list.append(elem);
	}

	subdiv.append(list);

}
