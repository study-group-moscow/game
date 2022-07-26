const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 7777,
    database: 'game_db_game_1'
});

module.exports = pool;
