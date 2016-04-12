/*
 * Main entry point for this application.
 */

/* eslint no-console:0 */

console.log('--');
console.log('Application Started.');
console.log('Environment: ' + process.env.NODE_ENV);

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use('/dist', express.static('./dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require('./lib/local/appRouter')(app);


app.listen(process.env.PORT || 3000, function () {
  console.log('starting up ...');
});

// console.log('--');
