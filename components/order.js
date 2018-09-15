const Products = require ("../models/product");

async function canMakeDish (order) {
	let canDo = true;

	for (let component of order.recipe) {
		let products = await Products.find ({name: component.name});
		let value = 0;

		for (let box of products) {
			value += box.value;
		}

		if (value >= component.value) {
			canDo = true;
		} else {
			canDo = false;
		}
	}

	return canDo;
}


async function makeOrder (order) {
	for (let component of order.recipe) {
		let product = await Products.find ({name: component.name});
		product.sort ((a, b) => b.value - a.value);

		for (let box of product) {
			if (component.value == 0) {
				continue;
			}

			if (box.value <= component.value) {
				component.value -= box.value;
				await Products.remove ({_id: box._id});
			} else {
				await Products.update ({_id: box._id}, {value: box.value - component.value});
				component.value = 0;
			}
		}
	}
}

module.exports = {
	canMakeDish: canMakeDish,
	makeOrder: makeOrder
};