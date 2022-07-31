import {Pool} from 'pg';
const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 7777,
    database: 'postgres'
});

module.exports = pool;
