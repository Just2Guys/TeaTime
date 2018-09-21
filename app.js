const mongoose = require ("mongoose");
const EventEmitter = require ("events");

const Products = require ("./models/product");
//
class App extends EventEmitter {
	


	constructor (config) {
		super ();

		mongoose.connect (config.dbLink, {useNewUrlParser: true}, err => {
			if (err) this.emit ("error")
			else this.emit ("ready");
		});	

		this._freecars = 10;
		this._carsWithOrders = [];
	}

	//check expire time of the all products in "store", if products expired remove them from collection
	checkExpireTimeProducts () {
		setInterval (async () => {
			let products = await Products.find ();
			for (let product of products) {
				if (product.expire - Date.now () < 0) {
					Products.remove ({_id: product._id}).exec();
				}
			}
		}, 3600 * 1000); //every hour
	}

	//update cars cords and then will send it to backend
	setCordsOfCars (emit) {
		setInterval (() => {
			for (let car of )
			emit (car.coords);
		}, 30 * 1000);
	}

	get amountOfFreeCars () {
		return this._freecars;
	}
}

module.exports = App;