const fs = require ("fs");
const path = require ("path");

function read () {
	return new Promise ((resolve, reject) => {
		fs.readdir ("./photos", (err, data) => {
			err ? reject (err) : resolve (data);
		});
	});
}


function rename (source, filename) {
	return new Promise ((resolve, reject) => {
		fs.rename ('./photos/' + source, './photos/' + filename + ".jpg", err => {
			err ? reject (err) : resolve (true);
		});
	});
}

module.exports = {
	read: read,
	rename: rename
};