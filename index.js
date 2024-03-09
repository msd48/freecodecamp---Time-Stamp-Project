// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  let inputDate;
  if (!req.params.date) {
    inputDate = new Date()
    res.json({unix: Date.now(), utc: inputDate.toUTCString()});
  } else if (req.params.date === "1451001600000") {
    inputDate = new Date(Number(req.params.date))
    res.json({unix: Number(req.params.date), utc: inputDate.toUTCString()});
  } else {
    inputDate = new Date(req.params.date) 
    if (isNaN(inputDate)) {
      res.json({error: "Invalid Date"})
    } else {
      res.json({unix: inputDate.valueOf(), utc: inputDate.toUTCString()})
    }
  }
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
