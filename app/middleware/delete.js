const db = require('../db/db');

module.exports.deleteById = (req, res) => {
	const sql = "DELETE FROM Notes WHERE id = ?";
	if( (req.params.id === "") || (req.params.id === undefined)){
		res.status(400).json({"error": "Not have ID for delete item"})
		return
	}
	if(Number(req.params.id) !== NaN){
		db.run(
			sql,
			req.params.id,
			function (err, result) {
				if (err){
					res.status(401).json({"error": res.message})
					return;
				}
				res.status(201).json({"message":"deleted", changes: this.changes})
		});
	}
}

module.exports.deleteAll = (req, res) => {
	const sql = "Delete From Notes";
	db.run(
		sql, 
		[],
		function (err, result) {
			if (err){
				res.status(401).json({"error": res.message})
				return;
			}
			res.status(201).json({"message":"deleted All item"})
	});
}