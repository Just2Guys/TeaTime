const Products = require ("../models/product");
const Menu = require ("../models/menu");
const Order = require ("../models/order");
const Cars = require ("../models/car");

class DishHelper {

	async canMakeDish (name) {
		let order = await Menu.findOne ({title: name});

		if (!order) {
			return false;
		}

		let canDo = true;

		for (let component of order.recipe) {
			let products = await Products.find ({name: component.name});
			let value = 0;

			for (let box of products) {
				value += box.value;
			}

			canDo = value >= component.value ? true : false; 
		}

		return canDo;
	}

	async getUserCar (login) {
		return await Cars.findOne ({client: login});
	}

	async userInOrder (id, login) {
		let freeOrder = await Order.findOne ({login: login});
		if (freeOrder) {
			return true;
		}

		let carOrder = await Cars.findOne ({userId: id});

		if (carOrder) {
			return true;
		}

		return false;
	}


	async makeDish (name) {
		let dish = await Menu.findOne ({title: name});

		for (let component of dish.recipe) {
			let product = await Products.find ({name: component.name});

			for (let box of product) {
				if (component.value == 0) {
					continue;
				}

				if (box.value <= component.value) {
					component.value -= box.value;
					Products.removeOne ({_id: box._id}).exec ();
				} else {
					Products.updateOne ({_id: box._id}, {value: box.value - component.value}).exec ();
					component.value = 0;
				}
			}
		}

		return dish.price;
	}


	saveOrder (dishes, place, login, price) {
		let order = new Order ();
		order.dishes = dishes;
		order.price = price;
		order.place = place;
		order.login = login;
		order.save ();

		return order;
	}
};



module.exports = DishHelper;