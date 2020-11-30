const db = require('../config/db');
const passport = require('passport');

module.exports = app => {
    app.get('/session', (req, res) => {
        if(req.user == undefined) {
            res.json("Not logged in")
        } else {
            res.json(req.user);
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

    app.get('/logout', (req, res, next) => {
        req.logout();
        res.redirect('/');
    })
};