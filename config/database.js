const dbConfig = require('./dbConfig');

var mysql = require('mysql2')

const dbInfo = {
	host: dbConfig.development.host, 
	user: dbConfig.development.username, 
	password: dbConfig.development.password, 
	database: dbConfig.development.database, 
}

// Connection
const db = mysql.createPool(dbInfo);

// Database Connection
db.on('connection', function (connection) {
	console.log('DB Connection established');
  
	connection.on('error', function (err) {
	  	console.error(new Date(), 'MySQL error', err.code);
	});
	connection.on('close', function (err) {
	  	console.error(new Date(), 'MySQL close', err);
	});
});

module.exports = db

