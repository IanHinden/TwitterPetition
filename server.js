const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const port = 3000;

app.use(bodyParser.json());

require('./routes/mongoRoutes')(app);

// startup our app at http://localhost:3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`));