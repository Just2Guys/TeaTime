const Cars = require ("../models/car");
const Orders = require ("../models/order"); 
const config = require ("../config");

const Car = new (require ("./car"));

class DriverHelper {

	async canTakeOrder () {
		let carsOnRoad = await Cars.find ();
		return config.cars > carsOnRoad;
	}

	async takeOrder (id, userId) {
		let order = await Orders.findOne ({_id: id});
		this.takeOrderToDriver (order, userId)
		Orders.deleteOne ({_id: id}).exec ();
	}

	takeOrderToDriver (order, userId) {
		let car = new Cars ();
		let way = Car.findWay (order.place [0], order.place [1]);

		car.userId = userId;
		car.client = order.login;
		car.cords = way;
		car.order = order;
		car.save ();
	}

}

module.exports = DriverHelper;