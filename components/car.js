const generalMap = require ("../map");
let map = [];

for (let i = 0; i < generalMap.length; i++) {
	map [i] = generalMap [i].slice ();
}


class Car {
	findWay (destX, destY) {
		let wave = 0;
		let nearByElements = [[-1, 0], [1, 0], [0, -1], [0, 1]];
		map [8][7] = wave;

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

		this.writeWay (destX, destY);
	}

	writeWay (endX, endY) {
		let nearByElements = [[-1, 0], [1, 0], [0, -1], [0, 1]];
		
		let currentX = endX;
		let currentY = endY;

		let local_x = endX;
		let local_y = endY;

		let way = [];
		
		way.unshift(currentX, currentY);

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

		return way;
	}
}

module.exports = Car;