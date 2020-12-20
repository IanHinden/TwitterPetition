require('dotenv').config();

let db;

if(process.env.NODE_ENV == "local") {
    db = process.env.DB_DEV_URI;
} else if (process.env.NODE_ENV == "prod") {
    db = process.env.DB_PROD_URI;
}

module.exports = {
    url : db,
}