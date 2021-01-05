const db = require('../config/db');
const mongoose = require('mongoose');

const User = require('../app/models/users');
const Nonuser = require('../app/models/nonusers');

mongoose.Promise = global.Promise;
mongoose.connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true});

module.exports = app => {
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

     app.get('/api/sum', function(req, res) {
      User.aggregate(
        [
         {
            $match: {
               pledged: true,
            }
         },
         {
            $group: {
               _id: 'id',  
              total: {
                $sum: '$followers'
              }
            }
          }
        ],
        function(err, result) {
          if (err) {
            res.send(err);
          } else {
            res.json(result);
          }
        }
      );
    });

   app.get('/api/users/featuredunverified', function(req, res) {
      User.findOne({
         verified : false,
         pledged: true
      }).sort('-followers').exec(function(err, users) {
        // if there is an error retrieving, send the error.
        // nothing after res.send(err) will execute
         if (err)
            res.send(err);
         users.email = undefined;
         users.signUpDate = undefined;
         users.allowEmail = undefined;
         res.json(users); // return all users in JSON format
      });
   });

   app.get('/api/users/featuredverified', function(req, res) {
      User.findOne({
         verified : true,
         pledged: true
      }).sort('-followers').exec(function(err, users) {
        // if there is an error retrieving, send the error.
        // nothing after res.send(err) will execute
         if (err)
            res.send(err);
         if(users){
           users.email = undefined;
           users.signUpDate = undefined;
           users.allowEmail = undefined;
         }
         res.json(users); // return all users in JSON format
      });
   });

     app.get('/api/users/:userName', function(req, res) {
        // use mongoose to get all users in the database
        User.find({
            userName : req.params.userName
        }, function(err, users) {
           // if there is an error retrieving, send the error.
           // nothing after res.send(err) will execute
           if (err)
              res.send(err);
           res.json(users); // return all users in JSON format
        });
     });

     app.post('/api/users/pledge/:id/:pledgevalue', function(req, res) {
         User.findOne({"id" : req.params.id}, function(err, user) {
            user.pledged = req.params.pledgevalue;
            user.save(function(err) {
               if (err)
                 res.send(err);
               res.json({ message: 'user updated!' });
           });
         });
     });

   app.post('/api/users/options/:id/:feature/:email', function(req, res) {
      User.findOne({"id" : req.params.id}, function(err, user) {
         user.allowFeature = req.params.feature;
         user.allowEmail = req.params.email;
         user.save(function(err) {
            if (err)
              res.send(err);
            res.json({ message: 'user updated!' });
        });
      });
   });
     
     app.post('/api/users/send', function(req, res) {
         var user = new User(); // create a new instance of the student model
         user.userName = req.body.userName; // set the student name (comes from the request)
         user.followers = req.body.followers;
         user.save(function(err) {
             if (err)
               res.send(err);
             res.json({ message: 'user created!' });
         });
      });

      app.post('/api/nonusers/send', function(req, res) {
         var nonuser = new Nonuser(); // create a new instance of the student model
         console.log(req.body);
         nonuser.email = req.body.email; // set the student name (comes from the request)
         nonuser.save(function(err) {
             if (err)
               res.send(err);
             res.json({ message: 'nonuser created!' });
         });
      });
};