const db = require('../db/db');
const moment = require('moment');


module.exports.create = (reg, res) => {
	const body = reg.body;
	try {
		if(body.text !== ""){
			let create_date = moment().format('DD-MM-YYYY HH:mm:ss');
			let data = {
				user_id: 777,
				text: body.text,
				done: 0,
				important: 0,
				date_create: create_date,
				date_update: create_date
			}
			let params = [data.user_id, data.text, data.done, data.important, create_date, create_date];
			let sql_add = `INSERT INTO Notes (user_id, text, done, important, date_create, date_update) VALUES ( ?, ?, ?, ?, ?, ?)`;
			db.run(sql_add, params, function (err, result) {
					if (err){
						res.status(401).json({"error": err.message})
						return;
					}
					res.status(201).json({ "message": "success", "id" : this.lastID });
				}
			);
		}
		else{
			res.status(401).json({"error": "You must enter text note"});
		}
	}
	catch (err) { 
		return res.status(400).json({ error: err.message });
	}
}