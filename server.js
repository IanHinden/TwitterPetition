const express = require('express');
const app = express();
var mongoose = require('mongoose');

const port = 3000;


var db = require('./config/db');
console.log("connecting--",db);
console.log(db.url);
mongoose.connect(db.url);

app.get('/', (req, res) => res.send('Welcome to Tutorialspoint!'));

app.get('/tproute', function (req, res) {
   res.send('This is routing for the application developed using Node and Express...');
});

var User = require('./app/models/users');
app.get('/api/users', function(req, res) {
   // use mongoose to get all students in the database
   User.find(function(err, users) {
      // if there is an error retrieving, send the error.
      // nothing after res.send(err) will execute
      if (err)
         res.send(err);
      res.json(users); // return all students in JSON format
   });
});
// startup our app at http://localhost:3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`));