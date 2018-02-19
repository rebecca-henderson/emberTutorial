import { module, test } from 'qunit';
import { visit, currentURL, click, fillIn, keyEvent } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import Service from '@ember/service';

let StubMapsService = Service.extend({
  getMapElement() {
    return document.createElement('div');
  }
});

module('Acceptance | list rentals', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function(assert) {
    this.application.register('service:maps', StubMapsService);
  });

test('should show rentals as the home page', async function (assert) {
	await visit('/');
	assert.equal(currentURL(), '/rentals', 'should redirect automatically');
});

test('should link to information about the company.', async function (assert) {
	await visit('/');
	//Couldn't get a:contains('About') to work, so added an id
	await click('a#aboutLink');
	assert.equal(currentURL(), '/about', 'should navigate to about');
});

test('should link to contact information.', async function (assert) {
	await visit('/');
	await click('a#contactLink');
	assert.equal(currentURL(), '/contact', 'should navigate to contact');
});

test('should list available rentals.', async function (assert) {
	await visit('/');
	//Can't find this? undefined
	assert.equal(find('.listing').length, 3, 'should see 3 listings');
});

test('should filter the list of rentals by city.', async function (assert) {
	await visit('/');
	await fillIn('.list-filter input', 'Seattle');
	//not a function?? being imported?
	await keyEvent('.list-filter input', 'keyup', 69);
	assert.equal(find('.listing').length, 1, 'should show 1 listing');
    assert.equal(find('.listing .location:contains("Seattle")').length, 1, 'should contain 1 listing with location Seattle');
});

test('should show details for a selected rental', async function (assert) {
	await visit('/rentals');
  	await click('a:contains("Grand Old Mansion")');
    assert.equal(currentURL(), '/rentals/grand-old-mansion', 'should navigate to show route');
    assert.equal(find('.show-listing h2').text(), "Grand Old Mansion", 'should list rental title');
    assert.equal(find('.description').length, 1, 'should list a description of the property');
});
});
