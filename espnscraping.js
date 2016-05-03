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
    __dirname + '/hitters.txt',
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
  var counter = 0;

  //grab all dataPoints from header
  $('td.playertablePlayerName a.flexpop').each(function() {
    var playerName = $(this).text();
    if (playerName.length > 0) {
      console.log(playerName);
      counter++;
    }
    //columns.push($(this).text());
  });

  ////createPlayer map per player
  //$('.rgAltRow').each(createPlayerMap);
  //$('.rgRow').each(createPlayerMap);
  //
  ////write playerMap to json file
  //jsonfile.writeFile('data.json', playerMap, function(err) {
  //  console.log(err);
  //});
  console.log(counter);
};

var createPlayerMap = function() {
  var playerData = cheerio.load($(this).html());
  //$('thead th').text()
  var playerName = playerData('td a').first().text();
  var columnValues = [];
  playerMap[playerName] = {};

  playerData('td').each(function() {
    console.log($(this).text());
    columnValues.push($(this).text());
  });

  for (var i = 0; i < columns.length; i++) {
    playerMap[playerName][columns[i]] = columnValues[i];
  }
};

init();