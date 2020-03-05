const db = require('../db/db');
const moment = require('moment');

module.exports.up = (req, res) => {
	const body = req.body;
	if(body.text){
		let update_date = moment().format('DD-MM-YYYY HH:mm:ss');
		const { user_id, text, done, important } = body;
		let params = [user_id, text, done, important, req.params.id];
		let sql = `UPDATE Notes set 
		user_id = COALESCE(?,user_id), 
		text = COALESCE(?,text), 
		done = COALESCE(?,done), 
		important = COALESCE(?,important), 
		date_update = "${update_date}"
		WHERE id = ?`;
		db.run( sql, params, function (err, result) {
			if (err){
				res.status(401).json({"error": err});
				return;
			}
				res.status(201).json({
				message: "success",
				data: body,
				changes: this.changes
			})
		});
	} else {
		res.status(402).json({"error": "have not text note!!!"});
	}
}