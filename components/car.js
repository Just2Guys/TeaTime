const map = require ("../map");

class Car {
	constructor (order, destX, destY) {
		this._order = order;
		
		this._x = 0;
		this._y = 0;
		this.way = [];
		this._destX = destX;
		this._destY = destY;
	}

	buildShortestWay () {
		let x = this._destX - this.x;
		let y = this._destY - this.y;
	}
}


module.exports = Car;