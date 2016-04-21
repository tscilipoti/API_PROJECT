/* eslint strict:0, no-console:0 */
'use strict';

// reference the ToyStore class
import { ToyStore } from './toyStore';

// prepopulate the store with some objects
const store = ToyStore.initializeStoreWithSampleData();

const appRouter = function (app) {
  // TODO: add "API" as part of the route?
  app.get('/api', function (req, res) {
    res.json({ message: 'you made it to the API!' });
  });

  app.get('/api/Toy', function (req, res) {
    // Start with all the toys.
    let selectedToys = store.getToys();

    // Caller may have passed in query string filters. Honor if so.
    if (req.query) {
      selectedToys = store.searchToys(req.query);
    }

    // Send the set, which may or may not have been filtered.
    res.send(selectedToys);
  });

  app.get('/api/Toy/:id', function (req, res) {
    let selectedToys;

    // Caller may have passed in query string filter. Honor if so.
    if (req.params && req.params.id) {
      selectedToys = store.getToyById(req.params.id);
    }

    // Send the set, which may or may not have been filtered.
    // res.send(req.params.id);
    res.send(selectedToys);
  });

  app.post('/api/Toy', function (req, res) {
    const newToy = req.body;
    const newId = store.addToy(newToy);
    res.json({
      message: 'toy created!',
      id: newId
    });
  });
};


module.exports = appRouter;
