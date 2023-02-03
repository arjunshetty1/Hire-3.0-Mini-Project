const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'hire3',
  password: '123456'
});

const query = async(query, params) => {
return new Promise((resolve, reject) => {
connection.execute(query, params, async function(err, results, fields) {
        if(err) reject(err);
        else resolve(results);
    });
})
}
module.exports = {connection, mysql, query};
