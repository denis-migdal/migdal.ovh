class Event {

	constructor(event, currentTarget) {
		this._event = event;

		this.which = event.which;
		this.ctrlKey = event.ctrlKey;

		this.currentTarget = currentTarget;
	}

	preventDefault() {
		this._event.preventDefault();
	}
}

class HTMLEntityList {

	constructor(objs) {
		this._objs = objs;

		this.length = objs.length;
	}

	on(event, delegate, fct) {

		if( (typeof delegate) === 'function' ) {
			fct = delegate;
			delegate = undefined;
		}

		let handler =  (event) => {

			let target = event.currentTarget;

			if (delegate ) {

				target = event.target;
				while( target && target != event.currentTarget ) {

					if( target.matches(delegate) )
						break;

					target = target.parentNode;
				}

				if( target === event.currentTarget )
					return true;

			}

			return fct( new Event(event, target) );

		};

		for( let obj of this._objs )
			obj.addEventListener(event, handler);

	}

	eq(idx) {
		return new HTMLEntityList([this._objs[idx]]);
	}

	removeClass(class_name) {
		for( let obj of this._objs )
			obj.classList.remove(class_name);
	}

	addClass(class_name) {
		for( let obj of this._objs )
			obj.classList.add(class_name);
	}

	toggleClass(class_name, enable) {

		if(enable)
			this.addClass(class_name);
		else
			this.removeClass(class_name);
	}

	attr(attr_name, attr_value) {

		if(attr_value === undefined)
			return this._objs[0].getAttribute(attr_name);

		for( let obj of this._objs)
			obj.setAttribute(attr_name, attr_value);
	}

	trigger(event) {

		for( let obj of this._objs)
			obj.dispatchEvent( new Event(event) );
		
	}
}


function $(arg) {

	switch( typeof arg ) {

		case 'function':

			if (document.readyState !== "loading")
				arg();
			else
				document.addEventListener("DOMContentLoaded", arg);

			return;

		case 'string':
			return new HTMLEntityList( document.querySelectorAll(arg) );

		case 'object':
			return new HTMLEntityList([arg]);
	}
}

module.exports = $;
