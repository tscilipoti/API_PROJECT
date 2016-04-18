/* eslint-env node, mocha */
/* eslint strict:0, no-console:0 */
'use strict';

// reference the ToyStore class
import { ToyStore } from '../../local/toyStore';
const assert = require('assert');

describe('/src/local/toyStore', function () {
  describe('#defaultToy()', function () {
    it('should return an instance of toy with property value "not found"', function () {
      const store = new ToyStore();
      assert(store);
      assert.equal('not found', store.defaultToy().sport);
    });
  });

  describe('#initializeStoreWithSampleData()', function () {
    it('should return four sample toys', function () {
      const sampleStore = ToyStore.initializeStoreWithSampleData();
      const sampleToys = sampleStore.getToys();
      assert(sampleToys); // we got something back
      assert(sampleToys.length > 0);
      assert(sampleToys[0].sport === 'hiking');
      assert(sampleToys[0].type === 'boot');
    });
  });

  describe('#searchToysOneParam()', function () {
    it('should return only two skiing toys', function () {
      const sampleStore = ToyStore.initializeStoreWithSampleData();
      const query = { sport: 'skiing' };
      const selectedToys = sampleStore.searchToys(query);
      assert(selectedToys, 'there were some toys'); // we got something back
      assert(selectedToys.length === 2, 'we got two toys');
      assert(selectedToys[0].type === 'pole', 'the first one was a pole');
    });
  });

  describe('#searchToysTwoParams()', function () {
    it('should return only one skiing toy', function () {
      const sampleStore = ToyStore.initializeStoreWithSampleData();
      const query = { sport: 'skiing', type: 'boot' };
      const selectedToys = sampleStore.searchToys(query);
      assert(selectedToys, 'there were some toys'); // we got something back
      assert(selectedToys.length === 1, 'we got one toy');
      assert(selectedToys[0].sport === 'skiing', 'it was a skiing toy');
      assert(selectedToys[0].type === 'boot', 'it was a ski boot');
    });
  });


  describe('#getToyById()', function () {
    it('should return specific toy', function () {
      const sampleStore = ToyStore.initializeStoreWithSampleData();
      const selectedToys = sampleStore.getToyById(1);
      assert(selectedToys, 'there were some toys'); // we got something back
      assert(selectedToys.length === 1, 'we got exactly one toy');
      assert(selectedToys[0].sport === 'hiking', 'we got hiking');
      assert(selectedToys[0].type === 'boot', 'we got pole');
    });
  });

  describe('#getToyByIdNoArg()', function () {
    it('should throw exception', function () {
      const sampleStore = ToyStore.initializeStoreWithSampleData();
      assert.throws(sampleStore.getToyById, Error, 'error thrown');
    });
  });

  describe('#addToy()', function () {
    it('should return id', function () {
      const sampleStore = ToyStore.initializeStoreWithSampleData();
      const newId = sampleStore.addToy({
        sport: 'canoeing',
        type: 'paddle'
      });
      const sampleToys = sampleStore.getToys();
      assert(sampleToys, 'there were some toys'); // we got something back
      assert(sampleToys.length === 5, 'there were five toys');
      assert(sampleToys[4].type === 'paddle', 'there was a paddle at index 4');
      assert(newId);
      // assert(newId === 4, 'new toy id was 5');
    });
  });
});
