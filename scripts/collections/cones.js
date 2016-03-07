/**
 * A module representing a collection of cones.
 *
 * @author Brandon Regard <bregard@gmail.com>
 * @module collections/cones
 * @requires Underscore
 * @requires Backbone
 * @requires Backbone.localStorage
 */
 define([
	'underscore',
	'backbone',
	'storage',
	'models/cone'
],

function (_, Backbone, Store, Cone) {
	'use strict';

	var ConesCollection = Backbone.Collection.extend({
	
		model: Cone,

		localStorage: new Store('cones'),

		/**
		 * Sum the cost of all of the cone models.
		 *
		 * @function
		 */
		totalCost: function () {
			return this.reduce(function (memo, value) {
				return memo + value.get('cost');
			}, 0);
		}
	});

	return new ConesCollection();
});