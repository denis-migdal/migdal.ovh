
function __PRESCRIPT__($, options, context = {}) {


	/** Add pages **/
	{
		let menu = JSON.parse( fs.readFileSync(context.__dir__ + '/pages/meta.json', 'utf8') );

		let menu_target = $('ul#nav');
		let content_target = $('div#pages');

		for(let elem of menu) {
			let lelem = elem.toLowerCase();

			menu_target.append('<li id="menu_'+ lelem +'"><a href="/'+ lelem +'">'+ elem +'</a></li>');

			let div = $('<div class="hidden" id="content_'+ lelem +'"></div>');
			let content = $.parseHTML( fs.readFileSync( context.__dir__ + '/pages/' + lelem + '.html', 'utf8' ) );

			div.append( content );

			require(context.__dir__ + '/js/pages/' + lelem + '.js')( div );

			content_target.append(div);
		}
	}


	/** Add contacts **/
	{
		let contacts = JSON.parse( fs.readFileSync(context.__dir__ + '/json/contacts.json', 'utf8') );

		let contact_target = $('footer>.home_contact');

		let icons = {
			mail: 'awesome-envelope-square',
			phone: 'awesome-phone-square',
			address: 'awesome-map-marker'
		};

		for(let key in contacts) {
			let contact = contacts[key];

			let icon = icons[contact.type];
			let smalltitle = contact['small-title'] || contact.title;
			smalltitle = smalltitle.replace(/\n/g, '<br/>');

			let url = '';

			if(contact.type == 'mail')
				url = "mailto:" + contact.title;
			else if(contact.type == 'phone')
				url = "tel:" + encodeURIComponent(contact.title);
			else
				url = contact.url || url;

			let link = $('<a class="contact_link"><span></span></a>');

			link.attr('title', contact.title);
			link.append( smalltitle );
			link.find('span').addClass('img-rounded glyphicon logo little_logo contact_logo');
			link.find('span').addClass(icon);
			link.attr('href', url);

			contact_target.append(link);
		}
	}

	/** external links **/
	{
		for(let elem of $('a')) {
			elem = $(elem);

			let href = elem.attr('href');
			if(!href)
				continue;

			if(href[0] != '/') {
				elem.attr('target', '_blank');
				elem.attr('rel', 'noreferrer noopener nofollow external');
			}
		}
	}
}