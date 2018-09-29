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
					Products.remove ({_id: product._id}).exec();
			}
		}
	}


	updateCarsCords () {
		setInterval (async () => {
			let cars = await Cars.find ();

			for (let car of cars) {
				let cords = updateCarsCords (car._id, car.cords);
				//socket.emit ("cords", {id: car._id, car.cords});
			}

		}, 30 * 1000);
	}

	upateCarCords (id, cords) {
		let nextCord = cords [0];
		Cars.update ({_id: id}, {cords: cords.splice (1, cords.length)}).exec ();
		return nextCord;
	}

	async getCars () {
		return await Cars.find ();
	}
}

module.exports = App;