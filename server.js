const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const app = express();

const port = 3000;

app.use(cors());

app.use(express.static(__dirname + '/public'));  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

require('./services/passport');

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
require('./routes/idiotRoutes')(app);

// startup our app at http://localhost:3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`));