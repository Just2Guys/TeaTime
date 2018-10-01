const Cars = require ("../models/car");
const Orders = require ("../models/order"); 
const config = require ("../config");

const Car = require ("./car");

class DriverHelper {

	async canTakeOrder () {
		let carsOnRoad = await Cars.find ();
		return config.freeCars > carsOnRoad;
	}

	async takeOrder (id, userId) {
		let order = await Orders.findOne ({_id: id});
		this.takeOrderToDriver (order, userId, )
		Orders.removeOne ({_id: id}).exec ();
	}

	takeOrderToDriver (order, userId) {
		let car = new Cars ();
		let way = Car.findWay (order.place.x, order.place.y);

		car.userId = userId;
		car.cords = way;
		car.order = order;
		car.save ();
	}

}

module.exports = DriverHelper;