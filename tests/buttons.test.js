/*global require,describe,beforeEach,afterEach,it,expect,spyOn*/
'use strict';

var buttons = require('../src/js/buttons.js');
var views = require('../src/js/views.js');
var jsonp = require('../src/js/lib/jsonp.js');
var eventHelper = require('../src/js/lib/eventHelper.js');
var user = require('../src/js/user.js');

var testEl;




describe('Initialising a button', function() {

	beforeEach(function() {
		spyOn(jsonp, 'get');
		user.init();
		user.id = 'userId';
		testEl = document.createElement('div');
		testEl.id = 'testEl';
		document.body.appendChild(testEl);

	});

	afterEach(function() {
		document.body.removeChild(testEl);
	});

	it('sets the initial state assuming that the user is initialised', function() {
		var entity = {id: 'author1', name: 'First Author'};
		views.button(testEl, entity);
		user.subscription.entities  = [entity];
		buttons.init(testEl);
		var button = testEl.querySelector('[data-o-author-alerts-id] button');		
		expect(button.innerText).toBe('Alerting');
	});

});

describe('Clicking the button', function() {

	beforeEach(function() {
		spyOn(jsonp, 'get');
		user.destroy();
		user.init();
		user.id = 'userId';
		testEl = document.createElement('div');
		testEl.id = 'testEl';
		document.body.appendChild(testEl);

	});

	afterEach(function() {
		document.body.removeChild(testEl);
	});

	it('toggles between states', function() {
		var entity = {id: 'author1', name: 'First Author'};
		views.button(testEl, entity);

		user.subscription.entities  = [];
		var updateSpy = spyOn(user.subscription, 'update');
		var eventSpy = spyOn(eventHelper, 'dispatch');

		buttons.init(testEl);
		var button = testEl.querySelector('[data-o-author-alerts-id] button');
		button.click();

		expect(updateSpy.argsForCall[0][0]).toEqual(entity);
		expect(updateSpy.argsForCall[0][1]).toEqual('daily');
		expect(button.parentElement.getAttribute('data-o-author-alerts-state')).toBe('true');
		
		expect(eventSpy).toHaveBeenCalledWith('oTracking.Event', {
			model: 'followme', type: 'follow', value: 'First Author'
		}, window);


		button.click();
		

		expect(updateSpy.argsForCall[1][0]).toEqual(entity);
		expect(updateSpy.argsForCall[1][1]).toEqual('off');


		expect(button.parentElement.getAttribute('data-o-author-alerts-state')).toBe('false');

		expect(eventSpy).toHaveBeenCalledWith('oTracking.Event', {
			model: 'followme', type: 'unfollow', value: 'First Author'
		}, window);


	});
});
