const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const app = express();

const twitter = require('./config/twitter');

const port = 3000;

app.unsubscribe(cors());

app.use(express.static(__dirname + '/public'));  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

require('./routes/mongoRoutes')(app);

// startup our app at http://localhost:3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`));