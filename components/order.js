const Products = require ("../models/product");

class DishHelper {

	async canMakeDish (order) {

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


	async makeOrder (order) {
		for (let component of order.recipe) {
			let product = await Products.find ({name: component.name});

			for (let box of product) {
				if (component.value == 0) {
					continue;
				}

				if (box.value <= component.value) {
					component.value -= box.value;
					Products.remove ({_id: box._id}).exec ();
				} else {
					Products.update ({_id: box._id}, {value: box.value - component.value}).exec ();
					component.value = 0;
				}
			}
		}
	}
};



module.exports = DishHelper;