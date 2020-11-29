const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const session = require('express-session');
const cors = require('cors');
const twit = require('./config/twitter');
const app = express();

const twitter = require('./config/twitter');
const User = require('./app/models/users');

const port = 3000;

app.use(cors());

app.use(express.static(__dirname + '/public'));  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


app.use(session({
   secret: 'keyboard cat',
   resave: true,
   saveUninitialized: true,
   cookie: { secure: false, sameSite: 'Lax' } //Fix this for production
 }))

app.use(passport.initialize());
app.use(passport.session());

require('./routes/mongoRoutes')(app);
require('./routes/authRoutes')(app);

passport.use(new TwitterStrategy({
   consumerKey: twit.twitterConsumerKey,
   consumerSecret: twit.twitterConsumerSecret,
   callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
 },
 function(token, tokenSecret, profile, cb) {
   User.findOne({
      'id': profile.id 
   }, function(err, user) {
      if (err) {
          return done(err);
      }
      //No user was found... so create a new user with values from Facebook (all the profile. stuff)
      if (!user) {
          user = new User({
              userName: profile.username,
              id: profile.id,
              followers: profile._json.followers_count,
          });
          user.save(function(err) {
              if (err) console.log(err);
              return cb(err, user);
          });
      } else {
          //found user. Return
          return cb(err, user);
      }
  });
 }
));

passport.serializeUser(function(user, cb) {
   cb(null, user);
});
 
passport.deserializeUser(function(obj, cb) {
   cb(null, obj);
});

// startup our app at http://localhost:3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`));