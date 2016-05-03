
'use strict';

var express = require('express');
//var Guid    = require('node-uuid');

//var DataRequestManager    = require('./DataRequestManager.js');
//var PeripheralInformation = require('./PeripheralInformation.js');

// Create the express app
var app = express();
var jsonInfo = require('./data.json');

// Hold the current peripheral sessions information
//var currentSessions = {};

// Set up the peripheral stuff
//var peripherals = new PeripheralInformation();

// Set the default value for verbose and receipt
//var recentReceipt = '';
//var mostRecentSession = '';
app.verbose = false; // Verbosity
app.report  = false; // Report peripheral status every second

// Set up the current state information
//peripherals.getAll().forEach( (key) => {
//  currentSessions[key] = new DataRequestManager(peripherals.getConfig(key), app.verbose);
//});

// Export the express app
module.exports = app;

// Make sure we can parse the body for printer POSTS
app.use( require('body-parser').json() );

// -------------------- Peripheral Mock RESTful Services ----------------

// Options request
app.get('/json', function(req, res) {
  //setHeaders(res);

  //res.status(200).json('./data.json');

  console.log('jsonInfo: ' + jsonInfo);
  console.log(jsonInfo['Clayton Kershaw']);
  res.send(jsonInfo);
});

app.get('/players/:playerName', function(req, res) {
  res.send(jsonInfo[req.params.playerName]);
});

app.get('/players/:playerName/stat/:stat', function(req, res) {
  console.log('returning: ' + jsonInfo[req.params.playerName][req.params.stat]);
  res.send(jsonInfo[req.params.playerName][req.params.stat]);
})

// Initial peripheral request for capabilities
// --------------------- Control Console -------------------------


// Always return these headers
function setHeaders(res) {
  if (! res.headersSent) {
    res.set('Access-Control-Allow-Headers', 'accept, api-user-name, client-id, nonce, signature, signature-datetime, tenant_id, content-type');
    res.set('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS, DELETE');
    res.set('Allow', 'GET, POST, PUT, DELETE, OPTIONS');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-Type', 'text/json');
  }
}


