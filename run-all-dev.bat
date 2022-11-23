
echo "START"
start /D "./server" npm run watch
start /D "./client" npm start
echo "DONE"