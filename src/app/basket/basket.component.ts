import { Component, OnInit } from '@angular/core';
import { Http, Response, JsonpModule, Headers, RequestOptions } from '@angular/http';

import { UserService } from '../services/user.service';
import { BasketService } from '../services/basket.service';
import { OrderService } from '../services/order.service';
import { AlertService } from '../services/alert.service';
import { Dish } from '../dish.class';
import { HttpConfig } from '../config';
import { User, UserNull } from '../user.class';

import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

class BasketDish {
  title: string;
  price: string;
  count: number;
}

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})

export class BasketComponent implements OnInit {

  mapSizeX: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];
  mapSizeY: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];

  houseX: number = 0;
  houseY: number = 0;

  openedBusket: boolean = false;
  basket: Array<BasketDish>;
  user: User = UserNull;
  haveOrder: boolean;
  orderPrice: number = 0;

  httpHeaders: any;

  constructor(private http: Http,
              private userService: UserService,
              private basketService: BasketService,
              private orderService: OrderService,
              private alertService: AlertService
              ){}

  ngOnInit() {
    this.userService.getUserData();
    this.userService.changeUserData.subscribe(USER => {
      this.user = USER;
    });

    this.orderService.getHaveOrder();
    this.orderService.changeHaveOrder.subscribe(HaveOrder => {
      this.haveOrder = HaveOrder;
    });

    this.getBasket();

    this.basketService.changeBasket.subscribe(BASKET => {
      this.basket = BASKET;
      this.orderPrice = 0;
      for (let i = 0; i < BASKET.length; i++) {
        this.orderPrice += BASKET[i].price * BASKET[i].count;
      }
    });

    this.httpHeaders = new Headers({ 'Content-Type': 'application/json' });
  }

  getBasket () {
    let BASKET = this.basketService.getBasket();
    this.basket = BASKET;
    this.orderPrice = 0;
    for (let i = 0; i < BASKET.length; i++) {
      this.orderPrice += Number(BASKET[i].price) * Number(BASKET[i].count);
    }
  }

  triggerBasket () {
    if (!this.openedBusket) {
      this.openBasket();
    } else {
      this.closeBasket();
    }
  }

  openBasket () {
    this.openedBusket = true;
    document.getElementById("stick_1").style.transform = "rotate3d(-1, -2.4, 0, 180deg)";
    document.getElementById("stick_2").style.transform = "rotate3d(-1, 2.4, 0, 180deg)";
    document.getElementById("basket_button").style.right = "400px";
    document.getElementById("basket_button").style.width = "25px";
    document.getElementById("basket_button").style.borderRadius = "2px 0px 0px 2px";
    document.getElementById("basket").style.width = "400px";
    document.getElementById("basket").style.boxShadow = "0px 0px 2px rgba(0,0,0,0.5)";
    document.getElementById("background").style.display = "block";
    for (let i = 0; i < this.basket.length; i++) {
      document.getElementById("price_" + i).style.left = "0%";
    }
    setTimeout(() => {
      document.getElementById("background").style.opacity = "1";
    }, 1);
  }

  closeBasket () {
    this.openedBusket = false;
    document.getElementById("stick_1").style.transform = "rotate3d(0, 0, 1, 45deg)";
    document.getElementById("stick_2").style.transform = "rotate3d(0, 0, 1, -45deg)";
    document.getElementById("basket_button").style.borderRadius = "0px 0px 0px 20px";
    document.getElementById("basket_button").style.width = "145px";
    document.getElementById("basket_button").style.right = "0px";
    document.getElementById("basket").style.width = "0px";
    document.getElementById("basket").style.boxShadow = "0px 0px 0px rgba(0,0,0,0.5)";
    document.getElementById("background").style.opacity = "0";
    for (let i = 0; i < this.basket.length; i++) {
      document.getElementById("price_" + i).style.left = "100%";
    }
    setTimeout(() => {
      document.getElementById("background").style.display = "none";
    }, 201);
  }

  showInfo (id: number) {
    document.getElementById("buttons_" + id).style.height = "40px";
    document.getElementById("dish_" + id).style.height = "86px";
  }

  closeInfo (id: number) {
    document.getElementById("buttons_" + id).style.height = "0px";
    document.getElementById("dish_" + id).style.height = "48px";
  }

  addOne (title: string, price: string) {
    this.basketService.addOne(title, price);
  }

  removeOne (title: string) {
    this.basketService.removeOne(title);
  }

  removeDish (title: string) {
    this.basketService.removeDish(title);
  }

  showLastStep () {
    if (this.basket == undefined || this.basket.length == 0) {
      this.alertService.addAlert("Error", "Корзина пуста.");
      return;
    }
    document.getElementById("last_step").style.display = "block";
    document.getElementById("last_step_background").style.display = "block";
    setTimeout(() => {
      document.getElementById("last_step").style.transform = "translate(-50%, 0px)";
      setTimeout(() => {
        document.getElementById("last_step").style.opacity = "1";
        document.getElementById("last_step_background").style.opacity = "1";
      }, 150);
    }, 1);
  }

  closeLastStep () {
    document.getElementById("last_step").style.transform = "translate(-50%, -250px)";
    document.getElementById("last_step").style.opacity = "0";
    document.getElementById("last_step_background").style.opacity = "0";
    setTimeout(() => {
      document.getElementById("last_step").style.display = "none";
      document.getElementById("last_step_background").style.display = "none";
    }, 300);
  }

  setCoordinates (x: number, y: number) {
    let left = 3.125 * (y - 1);
    let top = 3.125 * (x - 1);
    document.getElementById("pointer").style.left = left + "%";
    document.getElementById("pointer").style.top = top + "%";
    if ((y >= 11 && y <= 16) && (x >= 2 && x <= 3)) {
      this.houseY = 14;
      this.houseX = 3;
    } else
    if ((y >= 24 && y <= 31) && (x >= 2 && x <= 7)) {
      this.houseY = 27;
      this.houseX = 7;
    } else
    if ((y >= 25 && y <= 26) && (x >= 10 && x <= 11)) {
      this.houseY = 25;
      this.houseX = 10;
    } else
    if ((y >= 19 && y <= 22) && (x >= 8 && x <= 10)) {
      this.houseY = 20;
      this.houseX = 8;
    } else
    if ((y >= 4 && y <= 7) && (x >= 7 && x <= 8)) {
      this.houseY = 7;
      this.houseX = 7;
    } else
    if ((y >= 30 && y <= 31) && (x >= 9 && x <= 12)) {
      this.houseY = 31;
      this.houseX = 11;
    } else
    if (y == 30 && (x >= 9 || x <= 12)) {
      this.houseY = 29;
      this.houseX = 16;
    } else
    if ((y >= 27 && y <= 29) && (x >= 17 && x <= 19)) {
      this.houseY = 28;
      this.houseX = 17;
    } else
    if ((y >= 21 && y <= 25) && (x >= 16 && x <= 18)) {
      this.houseY = 23;
      this.houseX = 16;
    } else
    if (y == 20 && x <= 17) {
      this.houseX = 16;
    } else
    if ((y >= 19 && y <= 25) && (x >= 20 && x <= 22)) {
      this.houseY = 25;
      this.houseX = 21;
    } else
    if ((y >= 17 && y <= 19) && (x >= 29 && x <= 30)) {
      this.houseY = 20;
      this.houseX = 29;
    } else
    if ((y >= 24 && y <= 30) && (x >= 28 && x <= 30)) {
      this.houseY = 25;
      this.houseX = 30;
    } else
    if ((x >= 21 && x <= 31 && y >= 2 && y <= 10) ||
      (x >= 28 && x <= 31 && y >= 11 && y <= 13)) {
      this.houseY = 12;
      this.houseX = 28;
    } else {
      this.houseY = x;
      this.houseX = y;
    }
  }

  makeOrder () {
    if (this.houseX == 0 || this.houseY == 0) {
      this.alertService.addAlert("Error", "Сперва укажите, куда надо доставить заказ!");
      return;
    }

    let dishes = [];
    for (let i = 0; i < this.basket.length; i++) {
      for (let n = 0; n < this.basket[i].count; n++) {
        dishes.push(this.basket[i].title);
      }
    }
    this.http.post(HttpConfig.serverLink + "user/makeOrder", JSON.stringify({dishes: dishes, place: [this.houseX, this.houseY]}), {headers: this.httpHeaders, withCredentials: true})
    .map((res:Response) => res.json())
    .subscribe(data => {
      if (data.length == 0) {
        this.alertService.addAlert("Success", "Заказ успешно создан.");
        this.orderService.toggleHaveOrder();
        this.closeLastStep();
      } else {
        let allDishes = data[0];
        for (let i = 1; i < data.length; i++) {
          if (data[i] != data[i - 1])
            allDishes += ", " + data[i];
        }
        this.alertService.addAlert("Info", "Простите, у нас не достаточно ингредиентов для: " + allDishes + ".");
      }
    });
  }

}
