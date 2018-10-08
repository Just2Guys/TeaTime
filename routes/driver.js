const router = require ("express").Router ();
const roleChecker = require ("../components/role_checker");
const DriverHelper = new (require ("../components/driver_helper"));

const Orders = require ("../models/order");
const Users = require ("../models/user");
const Cars  = require ("../models/car");

const events = require ("events");
//const eventEmitter = new events.eventEmitter ();	



router.use (async (req, res, next) => {
	if (!req.session.pass) {
		res.json (false);
		return false;
	} 

	await roleChecker (1, req.session.pass) == true ? next () : res.json (false);
});

router.get ('/orders', (req, res) => {
	Orders.find ({}, (err, data) => {
		err ? console.log (err) : res.json (data);
	});
});

router.get ('/car', async (req, res) => {
	let car = await Cars.findOne ();
	res.json (car);
});

router.post ('/takeOrder', async (req, res) => {
	let user = await Users.findOne ({password: req.session.pass});
	let canTakeOrder = await DriverHelper.canTakeOrder ();

	if (canTakeOrder == true) {
		DriverHelper.takeOrder (req.body.order, user._id);
	}
});

router.get ('/takeOrder', async (req, res) => {
	let user = await Users.findOne ({password: req.session.pass});
	let canTakeOrder = await DriverHelper.canTakeOrder ();
	let order = await Orders.findOne ();

	if (canTakeOrder == true) {
		DriverHelper.takeOrder (order._id, user._id);
	} else {
		res.json (false);
	}
});

module.exports = {
	router: router,
	emitter: undefined
};