//#!/usr/bin/env node --harmony
'use strict';

var app = require('./baseballserver2.js');
//var commandLineArgs = require('command-line-args');

// Deal with any command line arguments
//var cli = commandLineArgs([
//  { name: 'verbose', alias: 'v', type: Boolean, defaultValue: false },
//  { name: 'port',    alias: 'p', type: Number,  defaultValue: 8081  },
//  { name: 'report',  alias: 'r', type: Boolean, defaultValue: false }
//]);
//var options = cli.parse();

//app.verbose = options.verbose;
//app.report  = options.report;

app.listen(8081, function () {
  console.log('Peripheral mocker listening on port ' + 8081);
});

