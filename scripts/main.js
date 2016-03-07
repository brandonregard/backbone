/**
 * Main entry point for our application.
 *
 * @author Brandon Regard <bregard@gmail.com>
 * @module main
 */
'use strict';

//
// Shim all of our non requirejs libraries.
//
require.config({
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		storage: {
			deps: [
				'backbone'
			],
			exports: localStorage
		}
	},
	paths: {
		jquery: 'libs/jquery',
		underscore: 'libs/underscore',
		backbone: 'libs/backbone',
		storage: 'libs/localStorage'
	}
});

require([
	'views/store'
],

//
// Entry point for our application.
//
function (StoreView) {
	new StoreView();
});