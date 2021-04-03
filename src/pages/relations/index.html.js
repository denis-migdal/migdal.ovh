//const partners = require('./../../json/partners.json');
//const sprites = require('./../../img/logos/sprites.json');

function print_list(type, target, $) {

	target.addClass('flexbox');

	for(let id in partners) {

		let partner = partners[id];

		if(id[0] == "@")
			return;

		if(partner.type != type)
			continue;

		let link = $('<a></a>');

		link.attr('title', partner.desc);
		link.attr('href', partner.url);
		link.attr('id', id);

		let content = $('<div></div>');
		let num = sprites.partners[id] || 0;

		let img = $('<div><div><div class="img img_partners sprite_'+ num +'"></div></div></div>');
		img.addClass('img-rounded logo big_logo partner_logo');
		content.append(img);

		content.append('<div style="text-align: center"><strong>' + partner.name + '</strong></div>');

		link.append(content);
		target.append(link);
	}

}


module.exports = (html, $) => {

	print_list('entity', html.find('#relations_entities'), $ );

	print_list('coauth', html.find('#relations_coauthors'), $ );

};
