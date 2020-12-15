require('dotenv').config();

let callback;
if(process.env.NODE_ENV == "local") {
    callback = process.env.TWITTER_CALLBACK_URL_LOCAL;
} else if (process.env.NODE_ENV == "dev") {
    callback = process.env.TWITTER_CALLBACK_URL_DEV;
}

module.exports = {
    twitterConsumerKey : process.env.TWITTER_CONSUMER_KEY,
    twitterConsumerSecret : process.env.TWITTER_CONSUMER_SECRET,
    twitterCallbackURL : callback,
    twitterAccessToken : process.env.TWITTER_ACCESS_TOKEN,
    twitterAccessTokenSecret : process.env.TWITTER_ACCESS_TOKEN_SECRET,
    url : process.env.SESSION_SECRET,
}