var cheerio = require('cheerio');
var fs = require('fs');
var jsonfile = require('jsonfile');

var playerArray = [];
var dateArray = [];
var monthObject = {
  'MAY': 5,
  'JUNE': 6,
  'JULY': 7,
  'AUGUST': 8
};

var init = function() {
  readFile();
};

var readFile = function() {
  fs.readFile(
    __dirname + '/pitchers.txt',
    readFileCallback
  );
};;

var readFileCallback = function(err, data) {
  if (err) {
    throw err;
  }
  fileReadSuccess(data.toString());
};

var getDateArray = function() {
  //get dates
  $('.playerTableBgRowSubhead').each(function() {
    var listCounter = 0;

    $(this).find('td').each(function() {
      if (listCounter >= 8) {
        var value = $(this).text();
        if (dateArray.indexOf(value) === -1) {
          dateArray.push($(this).text());
        }
      }
      listCounter++;
    });
  });

  dateArray = convertDate(dateArray);
};

var convertDate = function(dateArray) {
  for (var i = 0; i < dateArray.length; i++) {
    var dateArraySplit = dateArray[i].split(" ");
    dateArray[i] = monthObject[dateArraySplit[0]] + '/' + dateArraySplit[1];
  }
  return dateArray;
}

var getFreeAgentInfo = function() {
  $('tr.pncPlayerRow').each(function() {
    var listCounter = 0;
    var nextStart;
    $(this).find('td').each(function() {
      var dateField = $(this).text();
      if (listCounter >= 8) {
        if (dateField.indexOf('PP') > -1) {
          nextStart = dateArray[listCounter-8];
        }
      }
      listCounter++;
    });
    var playerNameLine = $(this).text();
    var playerNameArray = playerNameLine.split(",");
    var playerObject = {
      name: playerNameArray[0].replace('*', ''),
      dl: playerNameLine.indexOf('DL') > -1,
      nextStart: nextStart ? nextStart : null
    };

    playerArray.push(playerObject);
  });
};

var fileReadSuccess = function(htmlResults) {
  //load html into cheerio
  $ = cheerio.load(htmlResults);
  getDateArray();
  getFreeAgentInfo();

  ////write playerMap to json file
  jsonfile.writeFile('data.json', {'data': playerArray}, function(err) {
    if (err)
      console.log(err);
  });
};

init();