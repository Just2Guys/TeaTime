import { Injectable, Output, EventEmitter } from '@angular/core';
import { Dish } from '../dish.class';

@Injectable()
export class BasketService {

  basket: Array<Dish> = [];
  @Output() changeBasket: EventEmitter<any> = new EventEmitter();

  addToBasket (DISH: Dish) {
    if (!this.findDish(DISH) || basket.length == 0) {
      DISH.count = 1;
      this.basket.push(DISH);
    }
    this.changeBasket.emit(this.basket);
  }

  removeOneDish (dishTitle: string) {
    this.basket.find(dish => {
      if (dish.title == dishTitle) {
        dish.count--;
        if (dish.count <= 0) {
          this.removeFromBasket(dishTitle);
        } else
          this.changeBasket.emit(this.basket);
      }
    });
  }

  removeFromBasket (dishTitle: string) {
    this.basket.find(dish => {
      if (dish.title == dishTitle) {
        let index = this.basket.indexOf(dish);
        this.basket.splice(index, 1);
      }
    });
    this.changeBasket.emit(this.basket);
  }

  findDish (DISH: Dish) {
    let result = false;
    this.basket.find(dish => {
      if (dish.title == DISH.title) {
        dish.count++;
        result = true;
      }
    }
    return result;
  }

}
