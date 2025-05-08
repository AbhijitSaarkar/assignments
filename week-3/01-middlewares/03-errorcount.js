const express = require('express');

const app = express();
let errorCount = 0;

// You have been given an express server which has a few endpoints.
// Your task is to
// 1. Ensure that if there is ever an exception, the end user sees a status code of 404
// 2. Maintain the errorCount variable whose value should go up every time there is an exception in any endpoint

app.get('/user', function(req, res) {
  // this will be caught by Express and forwarded to your error handler
  throw new Error("some error");
  // unreachable, but left here to preserve structure
  res.status(200).json({ name: 'john' });
});

app.post('/user', function(req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

app.get('/errorCount', function(req, res) {
  res.status(200).json({ errorCount });
});

// error handling middleware
app.use(function(err, req, res, next) {
  // increment on every exception
  errorCount++;
  // respond with 404 as required
  res.status(404).send({});
});

// start server (unref so tests can exit cleanly)
const server = app.listen(3000);
server.unref();

module.exports = app;
