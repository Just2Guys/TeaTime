const map = require ("../map");

class Car {

	constructor (order, destX, destY, id) {
		this._order = order;
		
		this._x = 0;
		this._y = 0;
		this._way = [];
		this._destX = destX;
		this._destY = destY;
		this._id = id;
	}

	findWay () {
		wave = 0;
		nearByElements = [[-1, 0], [1, 0], [0, -1], [0, 1]];
		map [this._x][this._y] = wave;

		while (map [this._destX][this._destY] == -1) {
			for (let x = 0; x < map.length; x++) {
				for (let y = 0; y < map [x].length; y++) {
					if (map [x][y] == wave) {
						for (let cords of nearByElements) {
							if (map [x + cords [0]][y + cords [1]] != -1) {
								continue;
							}

							map [x + cords [0]][y + cords [1]] = wave + 1;
						}
					}
				}
			}

			wave++;
		}

		this.writeWay (this._destX, this._destY);
	}

	writeWay (endX, endY) {
		nearByElements = [[-1, 0], [1, 0], [0, -1], [0, 1]];
		
		currentX = endX;
		currentY = endY;

		local_x = endX;
		local_y = endY;
		
		this._way.unshift(currentX, currentY);

		while (map [currentX][currentY] != 0) {

			for (let cords of nearByElements) {
				let point = map [currentX + cords [0]][currentY + cords [1]];

				if (point < map [local_x][local_y] && point >= 0) {
					local_x = currentX + cords [0];
					local_y = currentY + cords [1];
				}
			}

			currentX = local_x;
			currentY = local_y;

			this._way.unshift ([currentX, currentY]);
		}
	}

	get way () {
		return this._way;
	}

	get id () {
		return this._id;
	}

	goByWay ()	{
		this._way.splice (0, 1);
		return this._way;
	}
}


module.exports = Car;