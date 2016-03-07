/**
 * A module representing a scoop model.
 *
 * @author Brandon Regard <bregard@gmail.com>
 * @module models/scoop
 * @requires Underscore
 * @requires Backbone
 */
 define([
	'underscore',
	'backbone'
],

function (_, Backbone) {
	'use strict';

	var ScoopModel = Backbone.Model.extend({
	
		//
		// Set the default valuess for our fields
		//
		defaults: {
				coneId: '',
				flavor: 'Vanilla',
				cost: 1.00
		},

		//
		// A convenient way to look up our cost information. Would like to
		// have loaded the cost information from an external file. However,
		// these types of requests are not available to file resources.
		//
		costTable: {
			'Vanilla': 1.00,
			'Chocolate': 1.10,
			'Strawberry': 1.15
		},

		/**
		 * Override set function to update the cost when the flavor of
		 * the scoop changes. Use our lookup table.
		 *
		 * @function
		 * @param {string} field The field being set.
		 * @param {string} value The value being set.
		 * @returns {Object} Call super.
		 */
		set: function(field, value) {

			if(field == 'flavor') {
				this.set('cost', this.costTable[value]);
			}
			
			return Backbone.Model.prototype.set.call(this, field, value);
		}
	});

	return ScoopModel;
});