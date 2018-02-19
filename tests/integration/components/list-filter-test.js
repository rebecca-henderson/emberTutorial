import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import RSVP from 'rsvp';
import Ember from 'ember';

const ITEMS = [{city: 'San Francisco'}, {city: 'Portland'}, {city: 'Seattle'}];
const FILTERED_ITEMS = [{city: 'San Francisco'}];

module('Integration | Component | list-filter', function(hooks) {
  	setupRenderingTest(hooks);

    test('should initially load all listings', async function (assert) {
    	// we want our actions to return promises,
 		//since they are potentially fetching data asynchronously
 		//FIXME: not a function?
  		this.on('filterByCity', () => {
    		return RSVP.resolve({ results: ITEMS });
  		});

  		// with an integration test,
  		// you can set up and use your component in the same way your application
  		// will use it.
  		await this.render(hbs`
    		{{#list-filter filter=(action 'filterByCity') as |results|}}
      		<ul>
      		{{#each results as |item|}}
        		<li class="city">
          			{{item.city}}
        		</li>
      		{{/each}}
      		</ul>
    		{{/list-filter}}
  		`);

  		assert.equal(this.$('.city').length, 3);
    	assert.equal(this.$('.city').first().text().trim(), 'San Francisco');

    });

    test('should update with matching listings', async function (assert) {
  		this.on('filterByCity', (val) => {
	    	if (val === '') {
	      		return RSVP.resolve({
	        		query: val,
	        		results: ITEMS });
	    	} else {
	      		return RSVP.resolve({
	        		query: val,
	        		results: FILTERED_ITEMS });
	    	}
 		});

  		await this.render(hbs`
    		{{#list-filter filter=(action 'filterByCity') as |results|}}
     		<ul>
      		{{#each results as |item|}}
        		<li class="city">
          		{{item.city}}
        		</li>
      		{{/each}}
      		</ul>
    		{{/list-filter}}
  		`);

		// The keyup event here should invoke an action that will cause the list to be filtered
		this.$('.list-filter input').val('San').keyup();

  		assert.equal(this.$('.city').length, 1);
    	assert.equal(this.$('.city').text().trim(), 'San Francisco');
	});
});
