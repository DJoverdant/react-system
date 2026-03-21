const { Pool } = require('pg');
require('dotenv').config();

const dsn = new Pool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

module.exports = {
  query: (text, params) => dsn.query(text, params),
};