const express = require('express');
const router = require('./routes');
const path = require('path');

const app = express();


app.use(function(req, res, next) {  // Cors...
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Parse JSON bodies (as sent by API clients)
app.use(express.static(__dirname + '/dist/shazam-test'));
app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname+'/dist/shazam-test/index.html'));
});
app.use(express.json());
app.use("/api", router);

app.listen(process.env.PORT || 5000)