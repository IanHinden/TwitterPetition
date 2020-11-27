require('dotenv').config();

module.exports = {
    twitterConsumerKey : process.env.TWITTER_CONSUMER_KEY,
    twitterConsumerSecret : process.env.TWITTER_CONSUMER_SECRET,
    twitterCallbackURL : process.env.TWITTER_CALLBACK_URL,
    url : process.env.SESSION_SECRET
}