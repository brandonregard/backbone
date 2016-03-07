/**
 * A module representing a cone model.
 *
 * @author Brandon Regard <bregard@gmail.com>
 * @module models/cone
 * @requires Underscore
 * @requires Backbone
 */
define([
	'underscore',
	'backbone',
	'collections/scoops'
],

function (_, Backbone, Scoops) {
	'use strict';
	
	var ConeModel = Backbone.Model.extend({
	
		//
		// Set the default valuess for our fields
		//
		defaults: {
				type: 'Cone',
				cost: 0.75
		},

		//
		// A convenient way to look up our cost information. Would like to
		// have loaded the cost information from an external file. However,
		// these types of requests are not available to file resources.
		//
		costTable: {
			'Cup': 0.50,
			'Cone': 0.75,
			'Waffle Cone': 1.00
		},

		//
		// Data member to hold the scoops associated with this cone.
		//
		scoops: [],

		/**
		 * Setup event listeners and initialize local data members.
		 *
		 * @function
		 */
		initialize: function() {
			this.listenTo(Scoops, 'add', this.scoopAdded);
			this.listenTo(Scoops, 'destroy', this.scoopRemoved);

			this.scoops = Scoops.where({coneId: this.id});
		},

		/**
		 * Override set function to update the cost when the type of
		 * cone changes. Use our lookup table.
		 *
		 * @function
		 * @param {string} field The field being set.
		 * @param {string} value The value being set.
		 * @returns {Object} Call super.
		 */
		set: function(field, value) {

			if(field == 'type') {
				this.set('cost', this.costTable[value]);
			}
			
			return Backbone.Model.prototype.set.call(this, field, value);
		},

		/**
		 * Event handler for when a scoop has been added to the
		 * scoops collection.
		 * @function
		 * @param {Object} scoop The scoop being added.
		 */
		scoopAdded: function(scoop) {

			//
			// If the scoop has been assigned to this cone add it to our
			// scoops data member to track it.
			//
			if(scoop.get('coneId') == this.id) {
				this.scoops.push(scoop)
			}
		},

		/**
		 * Event handler for when a scoop has been removed from the
		 * scoops collection.
		 * @function
		 * @param {Object} scoop The scoop being removed.
		 */
		scoopRemoved: function(scoop) {

			//
			// If the scoop has been assigned to this cone, remove it from
			// the array of scoops for this cone.
			//
			if(scoop.get('coneId') == this.id) {
				this.scoops.pop(scoop);
			}
		}
	});

	return ConeModel;
});