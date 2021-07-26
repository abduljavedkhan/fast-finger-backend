const dbConfig = require("../config/dbconfig.js");

const mysql = require('mysql');
const dbconfig = require("../config/dbconfig.js");
console.log('db '+ dbconfig.PASSWORD)
const connectionPool = mysql.createPool({
 // connectionLimit : dbConfig.pool.max,
  host     : dbConfig.HOST,
  user     : dbConfig.USER,
  password : dbConfig.PASSWORD,
  database : dbConfig.DB
});

// connectionPool.getConnection((err, connection) => {
//     if (err) {
//         if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//             console.log('Database connection was closed.');
//         }
//         if (err.code === 'ER_CON_COUNT_ERROR') {
//             console.log('Database has too many connections.')
//         }
//         if (err.code === 'ECONNREFUSED') {
//             console.log('Database connection was refused.');
//         }
//         if (connection) connection.release();
//         return
//     }
// });

//connectionPool.query = util.promisify(connectionPool.query); 

module.exports = connectionPool;

