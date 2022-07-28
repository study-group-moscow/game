const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 7777,
    database: 'postgres'
});

module.exports = pool;
