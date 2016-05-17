var cheerio = require('cheerio');
var fs = require('fs');
var jsonfile = require('jsonfile');

var playerMap = {};

var columns = [];

var init = function() {
  readFile();
};

var readFile = function() {
  fs.readFile(
    __dirname + '/fangraphspitching.txt',
    readFileCallback
  );
};;

var readFileCallback = function(err, data) {
  if (err) {
    throw err;
  }
  fileReadSuccess(data.toString());
};


var fileReadSuccess = function(htmlResults) {
  //load html into cheerio
  $ = cheerio.load(htmlResults);

  //grab all dataPoints from header
  $('thead th').each(function() {
    columns.push($(this).text());
  });

  //createPlayer map per player
  $('.rgAltRow').each(createPlayerMap);
  $('.rgRow').each(createPlayerMap);

  //write playerMap to json file
  jsonfile.writeFile('data.json', playerMap, function(err) {
    if (err) {
      console.log(err);
    }
  });
};

var createPlayerMap = function() {
  var playerData = cheerio.load($(this).html());
  //$('thead th').text()
  var playerName = playerData('td a').first().text();
  var columnValues = [];
  playerMap[playerName] = {};

  playerData('td').each(function() {
    columnValues.push($(this).text());
  });

  for (var i = 0; i < columns.length; i++) {
    playerMap[playerName][columns[i]] = columnValues[i];
  }
};

init();