const mysql = require('mysql2');

const connectionPool = mysql.createPool({
    host: 'tm-db-instance.c57cy1v1jykb.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: '123qweasdzxc',
    database: 'tm_database',
    port: 3306,
    connectionLimit: 10,
});

module.exports = {
    connectionPool,
}