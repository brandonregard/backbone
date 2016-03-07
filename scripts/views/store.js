/**
 * A module representing a store view.
 *
 * @author Brandon Regard <bregard@gmail.com>
 * @module views/store
 * @requires Underscore
 * @requires Backbone
 * @requires jQuery
 */
 define([
	'jquery',
	'underscore',
	'backbone',
	'collections/cones',
	'collections/scoops',
	'views/cone'
],

function ($, _, Backbone, Cones, Scoops, ConeView) {
	'use strict';

	var StoreView = Backbone.View.extend({
	
		//
		// The preexisting element to attach to.
		//
		el: '#store',

		//
		// Attach event listeners to elements of this view.
		//
		events: {
			'click #add-cones': 'addCones'
		},

		/**
		 * Setup event listeners and initialize local data members.
		 *
		 * @function
		 */
		initialize: function () {
			this.$conesToOrder = this.$('#add-cone-number');
			this.$totalCost = this.$('#total-cost');

			this.listenTo(Cones, 'add change:type destroy', this.render);
			this.listenTo(Scoops, 'add change:flavor destroy', this.render);
			this.listenTo(Cones, 'add', this.displayCone);

			//
			// Synchronize loading of collections. We need all of the scoops
			// loaded first so that when the cones are loaded we can associate
			// the scoops with their cones.
			//
			Scoops.fetch({
				success: function() {
					Cones.fetch();
				}
			});
		},

		/**
		 * On render, update values in this view.
		 *
		 * @function
		 * @returns {Object} Return self for chaining.
		 */
		render: function (e) {

			//
			// Total cost is the total cost computed for all cones plus
			// the total cost computed for all scoops.
			//
			this.$totalCost.text(
				'Total Cost: $' + 
					(Cones.totalCost() + Scoops.totalCost()).toFixed(2));

			return this;
		},

		/**
		 * Event handler for when a cone has been added in the view.
		 *
		 * @function
		 * @param {Object} The event.
		 */
		addCones: function () {

			//
			// Get the number of cones to add from a field in the view.
			//
			var num = Number(this.$conesToOrder.val());

			//
			// Create a cone model for each cone requested.
			//
			_.each(_.range(num), function() {
				Cones.create();
			}, this);
		},

		/**
		 * Event handler for when a cone is added to the view.
		 * Creates, renders, and inserts the cone into the DOM.
		 *
		 * @function
		 * @param {Object} The scoop.
		 */
		displayCone: function(cone) {
			var view = new ConeView({
				model: cone
			});

			$('#store-container').append(view.render().el);
		}
	});

	return StoreView;
});