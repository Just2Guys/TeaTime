const Products = require ("../models/product");
const Menu = require ("../models/menu");
const Order = require ("../models/order");

class DishHelper {

	async canMakeDish (name) {
		let order = await Menu.findOne ({title: name});

		if (!order) {
			return false;
		}

		let canDo = true;

		for (let component in order.recipe) {
			let products = await Products.find ({name: component});
			let value = 0;

			for (let box of products) {
				value += box.value;
			}

			canDo = value >=  order.recipe[component] ? true : false; 
		}

		return canDo;
	}


	async makeDish (name) {
		let dish = await Menu.findOne ({title: name});

		for (let component in dish.recipe) {
			let product = await Products.find ({name: component});

			for (let box of product) {
				if (component.value == 0) {
					continue;
				}

				if (box.value <= dish.recipe [component]) {
					dish.recipe [component] -= box.value;
					Products.removeOne ({_id: box._id}).exec ();
				} else {
					Products.updateOne ({_id: box._id}, {value: box.value - dish.recipe [component]}).exec ();
					dish.recipe [component] = 0;
				}
			}
		}
	}


	saveOrder (dishes, place, login) {
		let order = new Order ();
		order.dishes = dishes;
		order.place = place;
		order.login = login;
		order.save ();
	}
};



module.exports = DishHelper;