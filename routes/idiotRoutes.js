const twit = require('../config/twitter');
var Twit = require('twit')

module.exports = app => {
    var T = new Twit({
        consumer_key:         twit.twitterConsumerKey,
        consumer_secret:      twit.twitterConsumerSecret,
        access_token:         twit.twitterAccessToken,
        access_token_secret:  twit.twitterAccessTokenSecret,
        timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
        strictSSL:            true,     // optional - requires SSL certificates to be valid.
    })

    app.get('/api/idiot', (req, res) => {
        T
            .get('users/lookup', { user_id: '25073877'})
            .then(data => {
                res.send(data);
            })
        })
};