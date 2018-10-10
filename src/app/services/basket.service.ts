import { Injectable, Output, EventEmitter } from '@angular/core';

class Dish {
  title: string;
  price: string;
  count: number;
}

@Injectable()
export class BasketService {
  basket: Array<Dish> = [];
  @Output() changeBasket: EventEmitter<any> = new EventEmitter();

  addOne (TITLE: string, PRICE: string) {
    for (let i = 0; i < this.basket.length; i++) {
      if (this.basket[i].title == TITLE) {
        this.basket[i].count++;
        this.changeBasket.emit(this.basket);
        return;
      }
    }
    let obj = {
      title: TITLE,
      price: PRICE,
      count: 1
    };
    this.basket.push(obj);
    this.changeBasket.emit(this.basket);
    return;
  }

  removeOne (TITLE: string) {
    for (let i = 0; i < this.basket.length; i++) {
      if (this.basket[i].title == TITLE) {
        this.basket[i].count--;
        if (this.basket[i].count <= 0) {
          this.removeDish(TITLE);
          return;
        }
        this.changeBasket.emit(this.basket);
      }
    }
  }

  removeDish (TITLE: string) {
    for (let i = 0; i < this.basket.length; i++) {
      if (this.basket[i].title == TITLE) {
        this.basket.splice(i, 1);
        this.changeBasket.emit(this.basket);
      }
    }
  }

  getBasket () {
    return this.basket;
  }

}
