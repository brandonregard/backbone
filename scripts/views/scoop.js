/**
 * A module representing a scoop view.
 *
 * @author Brandon Regard <bregard@gmail.com>
 * @module views/scoop
 * @requires Underscore
 * @requires Backbone
 * @requires jQuery
 */
 define([
	'jquery',
	'underscore',
	'backbone'
],

function ($, _, Backbone) {
	'use strict';

	var ScoopView = Backbone.View.extend({
	
		//
		// Element to create on insertion.
		//
		tagName: 'div',

		//
		// Underscore template for rendering this view. Template is defined
		// in a script block rather than an external file because access
		// is restricted for file resources.
		//
		template: _.template($('#scoop-template').html()),

		//
		// Attach event listeners to elements rendered by this view.
		//
		events: {
			'change .scoop-type': 'changeFlavor',
			'click .remove-scoop': 'removeScoop'
		},

		//
		// CSS for the root element of the view. Determined by the flavor
		// of the scoop.
		//
		className: function() {
			return 'scoop ' + this.model.get('flavor').toLowerCase();
		},

		/**
		 * Setup event listeners and initialize local data members.
		 *
		 * @function
		 */
		initialize: function () {
			this.listenTo(this.model,
				'add change:flavor', this.render);
		},

		/**
		 * Render the view and insert it into the DOM.
		 *
		 * @function
		 * @returns {Object} Return self for chaining.
		 */
		render: function () {
			this.$el.html(this.template({
				flavor: this.model.get('flavor')
			}));
			this.$el.removeClass().addClass(this.className());

			return this;
		},

		/**
		 * Event handler for when the flavor of the scoop has been changed in
		 * the view.
		 *
		 * @function
		 * @param {Object} The event.
		 */
		changeFlavor: function(e) {
			this.model.set('flavor', e.target.value);
			this.model.save();
		},

		/**
		 * Event handler for when a scoop is removed from the view.
		 *
		 * @function
		 * @param {Object} The event.
		 */
		removeScoop: function(e) {
			this.model.destroy();
			this.remove();
		}
	});

	return ScoopView;
});