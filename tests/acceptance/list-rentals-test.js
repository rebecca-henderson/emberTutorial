import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | list rentals', function(hooks) {
  setupApplicationTest(hooks);

test('should show rentals as the home page', function (assert) {
	visit('/');
	andThen(function() {
		assert.equal(currentURL(), '/rentals', 'should redirect automatically');
	});
});

test('should link to information about the company.', function (assert) {
});

test('should link to contact information.', function (assert) {
});

test('should list available rentals.', function (assert) {
});

test('should filter the list of rentals by city.', function (assert) {
});

test('should show details for a selected rental', function (assert) {
});
});
