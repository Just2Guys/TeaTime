const router = require ("express").Router ();
const roleChecker = require ("../components/role_checker");
const DriverHelper = require ("../components/driver_helper");

const Orders = require ("../models/order");
const Users = require ("../models/user");

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

router.post ('/takeOrder', async (req, res) => {
	let user = await Users.findOne ({password: req.session.pass});
	let canTakeOrder = await DriverHelper.canTakeOrder ();

	if (canTakeOrder == true) {
		DriverHelper.takeOrder (order, user._id);
	}
});

module.exports = {
	router: router,
	emitter: undefined
};