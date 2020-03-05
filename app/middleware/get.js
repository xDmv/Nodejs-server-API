const db = require('../db/db');

module.exports.getAll = (reg, res) => {
	let sql = "Select * From Notes"
	let params = []
	db.all(sql, params, (err, rows) => {
		if (err) {
			res.status(400).json({"error":err.message});
			return;
		}
		res.status(201).json({
			"message":"success",
			"data":rows
		})
	});
}

module.exports.getByID = (reg, res) => {
	let sql = `Select id, text, done, important From Notes WHERE id = ?`;
	let params = [req.params.id];
	db.get( sql, params, function (err, row) {
		if (err){
			res.status(401).json({"error": res.message});
			return;
		}
		res.status(201).json({
			"message":"success",
			"data": row,
			"changes": this.changes
		})
	});
}