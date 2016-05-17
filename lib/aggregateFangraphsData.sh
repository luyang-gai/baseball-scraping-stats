echo 'starting curl to fangraphs for data'
curl http://www.fangraphs.com/leaders.aspx\?pos\=all\&stats\=sta\&lg\=all\&qual\=10\&type\=8\&season\=2016\&month\=0\&season1\=2016\&ind\=0\&team\=0\&rost\=0\&age\=0\&filter\=\&players\=0\&sort\=18,a\&page\=1_200 > fangraphspitching.txt
echo "finish curl to fangraphs for data"

echo 'starting fangraphsscraping node script'
node fangraphsscraping.js
echo 'finished fangraphsscraping node script'