const express = require('express');
const bodyParser = require('body-parser')
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const app = express();

const db = require('./config/db');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true});

const port = 3000;

app.use(cors());

app.use(express.static(__dirname + '/public'));
app.use('/privacypolicy', express.static(__dirname + '/public/privacypolicy.html'));
app.use('/termsofservice', express.static(__dirname + '/public/termsofservice.html'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./services/passport');

app.use(session({
   secret: process.env.SESSION_SECRET,
   resave: false,
   saveUninitialized: true,
   store: new MongoStore({ mongooseConnection: mongoose.connection})
   //cookie: { secure: false, sameSite: 'Lax' } //Fix this for production
 }))

app.use(passport.initialize());
app.use(passport.session());

require('./routes/mongoRoutes')(app);
require('./routes/authRoutes')(app);
require('./routes/idiotRoutes')(app);

// startup our app at http://localhost:3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`));