const generalMap = require ("../map");
const config = require ("../config");
let map = [];

for (let i = 0; i < generalMap.length; i++) {
	map [i] = generalMap [i].slice ();
}


class Car {
	findWay (destX, destY) {
		if (map [destX][destY] != -8) {
			return false;
		}

		//pointing house as road
		map [destX][destY] = -1;

		let wave = 0;
		let nearByElements = [[-1, 0], [1, 0], [0, -1], [0, 1]];
		map [config.cords [0]][config.cords [1]] = wave;

		while (map [destX][destY] == -1) {
			
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

		return this.writeWay (destX, destY);
	}

	writeWay (endX, endY) {
		let nearByElements = [[-1, 0], [1, 0], [0, -1], [0, 1]];
		
		let currentX = endX;
		let currentY = endY;

		let local_x = endX;
		let local_y = endY;

		let way = [];
		
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

			way.unshift ([currentX, currentY]);
		}

		let way_clone = [];

		for  (let i = 0; i < way.length; i++) {
			way_clone [i] = way [i].slice ();
		}

		let reversed = way_clone.reverse ();
		let all_way = way.concat (reversed);

		return all_way;
	}
}

module.exports = Car;