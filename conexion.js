const mysql = require('mysql2/promise');

const {connect} = require('./api/apimain');

const {DBNAME, DBUSER, DBPASS, DBHOST} = process.env;

const db = mysql.createPool({
    database:DBNAME,
    user: DBUSER,
    password:DBPASS,
    host: DBHOST,
    connectionLimit:10,
    queueLimit: 0
})

module.exports = db;