import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Service from '@ember/service';

let StubMapsService = Service.extend({
  getMapElement(location) {
    this.set('calledWithLocation', location);
    // We create a div here to simulate our maps service,
    // which will create and then cache the map element
    return document.createElement('div');
  }
});

module('Integration | Component | location-map', function(hooks) {
  setupRenderingTest(hooks);
  hooks.beforeEach(function(assert) {
    this.register('service:maps', StubMapsService);
    this.inject.service('maps', { as: 'mapsService' });
  });

  test('should append map element to container element', async function(assert) {
    this.set('myLocation', 'New York');
    await this.render(hbs`{{location-map location=myLocation}}`);
    assert.equal(this.$('.map-container').children().length, 1, 'the map element should be put onscreen');
    assert.equal(this.get('mapsService.calledWithLocation'), 'New York', 'a map of New York should be requested');
  });
});
