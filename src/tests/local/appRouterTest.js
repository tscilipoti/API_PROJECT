/* eslint-env node, mocha */
/* eslint strict:0, no-console:0 */
'use strict';

let server;
const assert = require('assert');
const express = require('express');
const supertest = require('supertest');
const bodyParser = require('body-parser');
// import { ToyStore } from '../../local/toyStore';
const app = express();
app.use('/dist', express.static('./dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require('../../local/appRouter')(app);

describe('POST /api/Toy', function () {
  before(function () {
    server = app.listen(process.env.PORT || 3000, function () {
      console.log('starting up ...');
    });
  });

  it('should add a new toy successfully', function (done) {
    const newToy = ({
      sport: 'hunting',
      type: 'turkey call'
    });
    supertest(app)
      .post('/api/Toy')
      .send(newToy)
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        console.log(JSON.stringify(res.text));
        const receipt = res.body;
        assert(receipt.id, 'got id');
        assert(receipt.message === 'toy created!', 'got message');
        done();
        return 0;
      });
  });

  it('should find the new toy on a subsequent call', function (done) {
    supertest(app)
      .get('/api/Toy?sport=hunting')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        const toysFromAPI = JSON.parse(res.text);
        assert(toysFromAPI, 'got some toys');
        assert(toysFromAPI.length >= 1, 'got at least one');
        assert(toysFromAPI[0].type === 'turkey call', 'got a turkey call');
        done();
        return 0;
      });
  });

  after(function (done) {
    server.close(done);
    console.log('shutting down ...');
  });
});

describe('GET /api/Toy', function () {
  before(function () {
    server = app.listen(process.env.PORT || 3000, function () {
      console.log('starting up ...');
    });
  });

  it('API should return the default list of toys', function (done) {
    supertest(app)
      .get('/api/Toy')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        const toysFromAPI = JSON.parse(res.text);
        assert(toysFromAPI, 'got some toys');
        assert(toysFromAPI.length >= 4, 'there were four toys');
        assert(toysFromAPI[0].sport === 'hiking', 'one of them was hiking');
        done();
        return 0;
      });
  });

  it('API should return only the skiing toys', function (done) {
    supertest(app)
      .get('/api/Toy?sport=skiing')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        const toysFromAPI = JSON.parse(res.text);
        assert(toysFromAPI, 'got some toys');
        assert(toysFromAPI.length === 2, 'there were two toys');
        assert(toysFromAPI[0].sport === 'skiing', 'first toy was a skiing toy');
        done();
        return 0;
      });
  });

  after(function (done) {
    server.close(done);
    console.log('shutting down ...');
  });
});
