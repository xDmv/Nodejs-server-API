const moment        = require('moment');
// const md5 = require('md5');
const sqlite3 = require('sqlite3').verbose();


let db = new sqlite3.Database('notes.db', (err) => {
	if (err) {
		console.error(err.message)
		throw err
	} else {
		console.log('Connected to the SQLite database.');
		db.run(`CREATE TABLE IF NOT EXISTS Notes(
			id INTEGER PRIMARY KEY AUTOINCREMENT, 
			user_id INTEGER,
			text TEXT,
			done INTEGER,
			important INTEGER,
			date_create TEXT,
			date_update TEXT
		);`);
		// db.run(`CREATE TABLE IF NOT EXISTS User(
		// 	id INTEGER PRIMARY KEY AUTOINCREMENT, 
		// 	name TEXT,
		// 	email text UNIQUE,
		// 	password text, 
		// 	role INTEGER,
		// 	date_create TEXT,
		// 	date_update TEXT
		// 	CONSTRAINT email_unique UNIQUE (email));`
		// );
		(err) => {
			if (err) {
				console.log(`err: ${err}`);
			}else{
				let create_date = moment().format('dd.mm.yyyy HH:mm:ss');
				let insertNote = `INSERT INTO Notes (user_id, text, complete, important, date_create, date_update) VALUES ( 911, 'Testing data', 0, 0, ${create_date}, ${create_date})`;
				db.run(insertNote);
			}
		}
	}
});

module.exports = db;