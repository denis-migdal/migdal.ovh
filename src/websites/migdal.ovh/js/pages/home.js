const sprites = require('./../../img/logos/sprites.json');

module.exports = (html, $) => {

	html.find('#home_teaching_stats').text('TODO');
	// <?= teaching_stats()['hetd']; ?>

	show_partners_icons(html.find('#home_partners'), $);

	html.find('#home_teachings').append('TODO');
	// <?php show_teachings_icons($teachings); ?>

	html.find('#home_demos').append('TODO');
	//  <?php show_demos(); ?>

	html.find('#home_publications').append('TODO');
	// <?php pub_summary(); ?>
};

const partners = require('./../../json/partners.json');

function show_partners_icons(target, $) {

	let div = $('<div class="d-flex flex-row justify-content-center flex-wrap"></div>');

	for(let id in partners) {

		let partner = partners[id];

		if(id[0] == "@")
			return;

		let num = sprites.partners[id] || 0;

		let img = $('<div class="img img_partners sprite_'+ num +'"></div>');
		img.addClass('img-rounded logo big_logo partner_logo');

		let link = $('<a></a>');
		link.attr('title', partner.name);
		link.attr('href', '/relations/' + id);
		link.addClass('img-rounded logo big_logo partner_minilogo');
		link.append(img);

		div.append(link);
	}

	target.append(div);
}