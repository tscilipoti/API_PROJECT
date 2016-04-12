/* eslint strict:0, no-console:0 */
'use strict';

export class ToyStore {

  constructor() {
    this.mToys = [];
    this.mToyIdNext = 0;
    this.defaultToyId = -1;
  }

  getToys() {
    if (this.mToys.length === 0) this.mToys.push(this.defaultToy());
    return this.mToys;
  }

  getToyById(id) {
    const filteredToys = this.mToys.filter(ToyStore.getToyByIdCallback, id);
    if (!filteredToys || filteredToys.length !== 1) {
      throw new Error('zero or more than one toy found for id');
    }
    return filteredToys;
  }

  static getToyByIdCallback(toy) {
    // if no filtering argument, return all toys
    if (!this) return true; // strange filter behavior - "this" represents other arg passed in ... in this case the desired sport.
    if (this.length === 0) return true;
    // if here, there was a populated "sport" query string arg, so filter results.
    return (String(toy.id) === String(this));
  }

  searchToys(query) {
    let keyValuePair;
    let toysToReturn;
    const terms = [];
    for (const param in query) {
      if (query.hasOwnProperty(param)) {
        keyValuePair = {
          key: param,
          value: query[param]
        };
        terms.push(keyValuePair);
        // console.log('search param key: ' + keyValuePair.key);
        // console.log('search param value: ' + keyValuePair.value);
      }
    }
    console.log('term count: ' + terms.length.toString());
    if (terms.length > 0) {
      console.log('caller passed in some search terms');
      // return some of the toys
      toysToReturn = this.mToys.filter(ToyStore.searchToysCallback, terms);
    } else {
      console.log('no query parms passed in');
      // return all the toys
      toysToReturn = this.getToys();
    }

    // FOR NOW ONLY, return a dummy toy if none found
    if (toysToReturn.length === 0) toysToReturn.push(this.defaultToy());

    console.log('toyCount: ' + toysToReturn.length);
    return toysToReturn;
  }

  // For a given toy, see if it has a property and a value for that property
  // that match any of the query string terms passed in via the "this" arg.
  static searchToysCallback(toy) {
    // strange filter behavior - "this" represents other arg passed in ... in this case the collection of query string arg pairs.
    if (!this || this.length <= 0) return false; // if no query terms passed in, no match.

    for (let i = 0; i < this.length; i++) {
      // console.log('kvp property name: ' + this[i].key.toString());
      // console.log('kvp property value: ' + this[i].value.toString());
      // console.log('toy property value: ' + toy[this[i].key.toString()]);
      if (!toy[this[i].key]) return false; // // toy does not have this property
      if (toy[this[i].key.toString()] !== this[i].value.toString()) return false; // toy has property but value doesn't match query string
    }

    // if we got this far, the toy has a property / value pair that matches all the search terms.
    return true;
  }

  addToy(details) {
    const newId = this.mToyIdNext;
    this.mToys.push({
      id: ++this.mToyIdNext,
      type: details.type,
      sport: details.sport
    });
    return newId;
  }

  // Default return object when no other criteria apply,
  // just so in the sandbox we can see what's going on.
  defaultToy() {
    return {
      id: this.defaultToyId,
      type: 'not found',
      sport: 'not found'
    };
  }

  static initializeStoreWithSampleData() {
    const ts = new ToyStore();

    ts.addToy({
      sport: 'hiking',
      type: 'boot'
    });

    ts.addToy({
      sport: 'hiking',
      type: 'day pack'
    });

    ts.addToy({
      sport: 'skiing',
      type: 'pole'
    });

    ts.addToy({
      sport: 'skiing',
      type: 'boot'
    });

    return ts;
  }

}
