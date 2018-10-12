const mongoose = require ("mongoose");
const EventEmitter = require ("events");

const Products = require ("./models/product");
const Cars = require ("./models/car");

class App extends EventEmitter {
	
	constructor (config) {
		super ();

		mongoose.connect (config.dbLink, {useNewUrlParser: true}, err => {
			err ? this.emit ("error") : this.emit ("ready");
		});	
	}

	//check expire time of the all products in "store", if products expired remove them from collection
	checkExpireTimeProducts () {
		this.checkExpireTime ();

		setInterval (async () => {
			this.checkExpireTime ();
		}, 3600 * 1000); //every hour
	}

	async checkExpireTime () {
		let products = await Products.find ();
		
		for (let product of products) {
			if (product.expire - Date.now () < 0) {
					Products.deleteOne ({_id: product._id}).exec();
			}
		}
	}


	updateCarsCords (io) {
		setInterval (async () => {

			let cars = await Cars.find ();

			for (let car of cars) {
				let nextCords = car.cords [0];
				let updated_cords = car.cords.splice (1, car.cords.length);

				if (updated_cords.length == 0) {
				 	Cars.deleteOne ({_id: car._id}).exec ();
				} else {
					Cars.updateOne ({_id: car._id}, {$set: {cords: updated_cords}}).exec ();
				}

				io.emit ("cords", {id: car._id});
			}

		}, 30 * 1000);
	}
}

module.exports = App;