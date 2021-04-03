let {component_builder} = require('prehtml-loader/preproc_helper.js');

module.exports = {

	prerender: ($, options) => {

		let page_order = require('../pages/pages_order.json');


		// Menu
		let menu = $('#nav');

		for(let page of page_order)
			menu.append( component_builder($, '../components/menu_item', {item: page}) );



		/** Add pages **/
		let content_target = $('#pages');

		for(let page of page_order)
			content_target.append( component_builder($, '../components/page_container', {item: page}) );

		/** Add contacts **/
		let contacts = require('../pages/home/contacts.json');

		let contact_target = $('#home_contact');

		for(let key in contacts) {

			let contact = contacts[key];

			let url = '';

			if(contact.type == 'mail')
				url = "mailto:" + contact.title;
			else if(contact.type == 'phone')
				url = "tel:" + encodeURIComponent(contact.title);
			else
				url = contact.url ?? url;

			contact_target.append( component_builder($, '../components/contact_item/', {

				href: url,
				title: contact.title,
				smalltitle: contact['small-title'] ?? contact.title,
				icon_type: contact.type
			}) );
		}
	},

	render: ($, options) => {

		/** external links **/
		for(let elem of $('a')) {

			elem = $(elem);
			let href = elem.attr('href');
			if(!href)
				continue;

			if(href.startsWith('https://') || href.startsWith('http://') ) {
				elem.attr('target', '_blank');
				elem.attr('rel', 'noreferrer noopener nofollow external');
			}
		}

		/** disable some pages **/
		$('#menu_cv').addClass('disabled');
		$('#menu_teaching').addClass('disabled');
		$('#menu_relations').addClass('disabled');
		$('#menu_resources').addClass('disabled');
		$('#menu_topics').addClass('disabled');
	}
};