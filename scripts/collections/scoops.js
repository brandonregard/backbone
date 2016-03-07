/**
 * A module representing a collection of scoops.
 *
 * @author Brandon Regard <bregard@gmail.com>
 * @module collections/scoops
 * @requires Underscore
 * @requires Backbone
 * @requires Backbone.localStorage
 */
define([
	'underscore',
	'backbone',
	'storage',
	'models/scoop'
],

function (_, Backbone, Store, Scoop) {
	'use strict';

	var ScoopsCollection = Backbone.Collection.extend({
	
		model: Scoop,

		localStorage: new Store('scoops'),

		/**
		 * Sum the cost of all of the scoop models.
		 *
		 * @function
		 */
		totalCost: function () {
			return this.reduce(function (memo, value) {
				return memo + value.get('cost');
			}, 0);
		}
	});

	return new ScoopsCollection();
});