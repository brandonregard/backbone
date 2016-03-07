/**
 * A module representing a cone view.
 *
 * @author Brandon Regard <bregard@gmail.com>
 * @module views/cone
 * @requires Underscore
 * @requires Backbone
 * @requires jQuery
 */
 define([
	'jquery',
	'underscore',
	'backbone',
	'collections/scoops',
	'views/scoop',
],

function ($, _, Backbone, Scoops, ScoopView) {
	'use strict';

	var ConeView = Backbone.View.extend({
	
		//
		// Element to create on insertion.
		//
		tagName: 'div',

		//
		// CSS for the root element of the view.
		//
		className: 'cone',

		//
		// Underscore template for rendering this view. Template is defined
		// in a script block rather than an external file because access
		// is restricted for file resources.
		//
		template: _.template($('#cone-template').html()),

		//
		// Attach event listeners to elements rendered by this view.
		//
		events: {
			'change .cone-type': 'changeType',
			'click .add-scoop': 'addScoop',
			'click .remove-cone': 'removeCone'
		},

		/**
		 * Setup event listeners and initialize local data members.
		 *
		 * @function
		 */
		initialize: function () {
			this.listenTo(Scoops, 'add', this.displayScoop);
		},

		/**
		 * Render the view and insert it into the DOM.
		 *
		 * @function
		 * @returns {Object} Return self for chaining.
		 */
		render: function () {
			this.$el.html(this.template({type: this.model.get('type')}));

			_.each(this.model.scoops, function(scoop) {
				this.displayScoop(scoop);
			}, this);

			return this;
		},

		/**
		 * Event handler for when the type of cone has been changed in
		 * the view.
		 *
		 * @function
		 * @param {Object} The event.
		 */
		changeType: function(e) {
			this.model.set('type', e.target.value);
			this.model.save();
		},

		/**
		 * Event handler for when a cone is removed from the view.
		 *
		 * @function
		 * @param {Object} The event.
		 */
		removeCone: function(e) {

			//
			// Make a copy of the scoops associated with this views
			// cone model.
			//
			var scoops = _.filter(this.model.scoops, function() {
				return true;
			});

			//
			// Destroy each associated scoop. Make sure to unbind event
			// listeners to free up memory.
			//
			_.each(scoops, function(scoop) {
				scoop.destroy();
				scoop.off();
			});
			this.model.destroy();
			this.remove();
		},

		/**
		 * Event handler for when a scoop is added to the view.
		 * Creates our scoop model.
		 *
		 * @function
		 * @param {Object} The event.
		 */
		addScoop: function (e) {

			//
			// Make sure to set the coneId that this scoop is
			// associated with.
			//
			Scoops.create({coneId: this.model.id, cone: this.cone});
		},

		/**
		 * Event handler for when a scoop is added to the view.
		 * Creates, renders, and inserts the scoop into the DOM.
		 *
		 * @function
		 * @param {Object} The scoop.
		 */
		displayScoop: function(scoop) {

			//
			// If the scoop added belongs to this view, create a new scoop
			// view, render it and insert it into the DOM.
			//
			if(scoop.get('coneId') == this.model.id) {
				var view = new ScoopView({model: scoop});

				this.$el.append(view.render().el);
			}
		}
	});

	return ConeView;
});