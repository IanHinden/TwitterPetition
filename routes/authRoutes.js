const db = require('../config/db');
const passport = require('passport');

module.exports = app => {
    app.get('/session', (req, res) => {
        if(req.user == undefined) {
            console.log('Checking login failed')
        } else {
            console.log(req.user)
        }
    });

    app.get('/auth/twitter',
        passport.authenticate('twitter'));
  
    app.get('/auth/twitter/callback', 
        passport.authenticate('twitter', { failureRedirect: '/login' }),
            function(req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
            });
};