#!/bin/bash
#
##for i in {0..4}
##do
##    INDEX=50 * i
##    echo $INDEX
##    echo `expr i * 50`
###    curl http://games.espn.go.com/flb/freeagency\?leagueId\=49335\&seasonId\=2016\&startIndex\=INDEX >> hitters.txt
##done
#rm hitters.txt
#curl http://games.espn.go.com/flb/freeagency\?leagueId\=49335\&seasonId\=2016 >> hitters.txt
#curl http://games.espn.go.com/flb/freeagency\?leagueId\=49335\&seasonId\=2016\&startIndex\=50 >> hitters.txt
#curl http://games.espn.go.com/flb/freeagency\?leagueId\=49335\&seasonId\=2016\&startIndex\=100 >> hitters.txt
#curl http://games.espn.go.com/flb/freeagency\?leagueId\=49335\&seasonId\=2016\&startIndex\=150 >> hitters.txt
#curl http://games.espn.go.com/flb/freeagency\?leagueId\=49335\&seasonId\=2016\&startIndex\=200 >> hitters.txt

rm pitchers.txt
echo 'starting curls for espn free agents'
curl http://games.espn.go.com/flb/freeagency\?leagueId\=49335\&seasonId\=2016\&view\=upcomingschedule\&slotCategoryId\=14 >> pitchers.txt
curl http://games.espn.go.com/flb/freeagency\?leagueId\=49335\&seasonId\=2016\&view\=upcomingschedule\&slotCategoryId\=14\&startIndex\=50 >> pitchers.txt
curl http://games.espn.go.com/flb/freeagency\?leagueId\=49335\&seasonId\=2016\&view\=upcomingschedule\&slotCategoryId\=14\&startIndex\=100 >> pitchers.txt
curl http://games.espn.go.com/flb/freeagency\?leagueId\=49335\&seasonId\=2016\&view\=upcomingschedule\&slotCategoryId\=14\&startIndex\=150 >> pitchers.txt
curl http://games.espn.go.com/flb/freeagency\?leagueId\=49335\&seasonId\=2016\&view\=upcomingschedule\&slotCategoryId\=14\&startIndex\=200 >> pitchers.txt
echo 'finished curls for espn free agents'

echo 'starting espnscraping.js'
node espnscraping.js
echo 'finishing espnscraping.js'