/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/jquery_base.js":
/*!*******************************!*\
  !*** ./src/js/jquery_base.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

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


/***/ }),

/***/ "./src/js/nav.js":
/*!***********************!*\
  !*** ./src/js/nav.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

//const $ = require('jquery');
const $ = __webpack_require__(/*! ./jquery_base.js */ "./src/js/jquery_base.js");

var index;
var last_anchor;
var last_anchor_elem = null;

let pages = null;


function next_slide() {

	if( index+1 < pages.length)
		goto_page(index+1);
}

function previous_slide() {
	if( index != 0)
		goto_page(index-1);
}

function goto_page(next, anchor) {

	slide(index, next, anchor);
	index = next;
	last_anchor = anchor;

	let name = id_to_pagename[next];
	var stateObj = { name: name, id: next };

	let uanchor = "";
	if( anchor != null) {
		uanchor = "/" + anchor;		
	}

	history.pushState(stateObj, name, "/"+name+uanchor);
}

function goto_pagename(next, anchor){

	next = pagename_to_id[next];
	goto_page(next, anchor);
}

function slide(old, index, anchor) {

	pages.eq(old).removeClass("active");
	pages.eq(index).addClass("active");

	if( $('#navbar').attr('aria-expanded') == "true" ){
		$(".navbar-toggle").trigger( "click" );
	}

	$('#pages > *').eq(old).addClass('hidden_page');
	$('#pages > *').eq(index).removeClass('hidden_page');

	$('#page_footer').toggleClass('hidden_page', index == 0);

	if( last_anchor_elem != null) {
		$(last_anchor_elem).removeClass("url_hash");
	}

	if( anchor != null) {
		let elem = document.getElementById(anchor);
		elem.scrollIntoView();
		$(elem).addClass("url_hash");
		last_anchor_elem = elem;
	} else {
		window.scrollTo(0, 0);
	}
}

let touch_x = null;
let touch_y = null;

function init_events() {

	$(document).on( 'keydown', (event) => {

		if(event.which == 37) {
			previous_slide();
			return false;
		}
		if(event.which == 39) {
			next_slide();
			return false;
		}
	} );

	$(document).on("touchstart", (event) => {
		let touch = event.changedTouches[0];
		touch_x = touch.pageX;
		touch_y = touch.pageY;
	});
	$(document).on("touchend", (event) => {
		let touch = event.changedTouches[0];
		let dx = touch.pageX - touch_x;
		let dy = touch.pageY - touch_y;

		if( Math.abs(dx) < Math.abs(dy) )
			return;

		if( Math.abs(dx) < 50 )
			return;

		if( dx < 0 )
			next_slide();
		else if(dx > 0)
			previous_slide();
	});
}

function init() {
	index = initial_page;

	let parts = window.location.pathname.split('/');
	let anchor = parts[2];

	if(anchor == "" || anchor === undefined)
		anchor = null;
	init_events();
	slide(index, index, anchor);
}

//TODO DOM event ? / Import JQuery ?
$( () => {
	pages = $('#nav > *');
	init();
	document.documentElement.scrollTop -=60;

	window.onpopstate = (event) => {
		let new_index = initial_page;		
		if( event.state != null)
			new_index = event.state.id;
		slide(index, new_index);
		index = new_index;
	};


	$('html').on('click', "a", (event) => {

		if( event.ctrlKey )
			return true;

		let dst = $(event.currentTarget).attr('href');

		if(dst[0] != '/' || $(event.currentTarget).attr('download') )
			return true;

		event.preventDefault();

		let [n, a, b] = dst.split('/');
		goto_pagename(a, b);

		document.documentElement.scrollTop -=60;

		return false;

	});

	$('html').on('click', ".scrolltop_btn", (event) => {

		event.preventDefault();

		document.documentElement.scrollTop = 0;

		return false;
	});
});

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_nav_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/nav.js */ "./src/js/nav.js");
/* harmony import */ var _js_nav_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_nav_js__WEBPACK_IMPORTED_MODULE_0__);


/***/ })

/******/ });
//# sourceMappingURL=main.bundle.js.map