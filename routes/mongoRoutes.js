const db = require('../config/db');
const mongoose = require('mongoose');

const User = require('../app/models/users');

mongoose.Promise = global.Promise;
mongoose.connect(db.url, { useNewUrlParser: true });

module.exports = app => {
    app.get('/', (req, res) => res.send('Welcome to Tutorialspoint!'));

    app.get('/tproute', function (req, res) {
    res.send('This is routing for the application developed using Node and Express...');
    });

    app.get('/api/users', function(req, res) {
        // use mongoose to get all users in the database
        User.find(function(err, users) {
           // if there is an error retrieving, send the error.
           // nothing after res.send(err) will execute
           if (err)
              res.send(err);
           res.json(users); // return all users in JSON format
        });
     });
     
     app.post('/api/users/send', function(req, res) {
         var user = new User(); // create a new instance of the student model
         user.userName = req.body.userName; // set the student name (comes from the request)
         user.save(function(err) {
             if (err)
               res.send(err);
             res.json({ message: 'user created!' });
         });
      });
};