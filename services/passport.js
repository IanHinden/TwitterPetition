const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const twit = require('../config/twitter');

const User = require('../app/models/users');

passport.serializeUser(function(user, cb) {
    cb(null, user);
 });
  
 passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
 });

 passport.use(new TwitterStrategy({
    consumerKey: twit.twitterConsumerKey,
    consumerSecret: twit.twitterConsumerSecret,
    callbackURL: twit.twitterCallbackURL,
    userProfileURL  : 'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true',
  },
  function(token, tokenSecret, profile, cb) {
    console.log(profile);
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
               email: profile.emails[0].value,
               followers: profile._json.followers_count,
               pledged: false,
               profileImageUrl: profile.photos[0].value,
               verified: profile._json.verified,
               allowFeature: true,
               allowEmail: true,
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
