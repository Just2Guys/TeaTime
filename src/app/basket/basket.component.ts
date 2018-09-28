import { Component, OnInit } from '@angular/core';
import { Http, Response, JsonpModule, Headers, RequestOptions } from '@angular/http';

import { UserService } from '../services/user.service';
import { BasketService } from '../services/basket.service';
import { Dish } from '../dish.class';
import { Settings } from '../config';
import { User, UserNull } from '../user.class';

import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  openedBusket: boolean = false;
  basket: Array<object>;
  user: User;

  constructor(private http: Http, private userService: UserService, private basketService: BasketService) { }

  ngOnInit() {
    this.userService.changeUserData.subscribe(USER => {
      this.user = USER;
    });
    this.basketService.changeBasket.subscribe(BASKET => {
      this.basket = BASKET;
    });
  }

  triggerBasket () {
    if (!this.openedBusket) {
      this.openedBusket = true;
      document.getElementById("stick_1").style.transform = "rotate3d(-1, -2.4, 0, 180deg)";
      document.getElementById("stick_2").style.transform = "rotate3d(-1, 2.4, 0, 180deg)";
      document.getElementById("basket_button").style.borderRadius = "2px 0px 0px 2px";
      document.getElementById("basket_button").style.right = "400px";
      document.getElementById("basket").style.width = "400px";
      document.getElementById("basket").style.borderWidth = "1px 0px 1px 1px";
    } else {
      this.openedBusket = false;
      document.getElementById("stick_1").style.transform = "rotate3d(0, 0, 1, 45deg)";
      document.getElementById("stick_2").style.transform = "rotate3d(0, 0, 1, -45deg)";
      document.getElementById("basket_button").style.borderRadius = "30px 0px 0px 30px";
      document.getElementById("basket_button").style.right = "0px";
      document.getElementById("basket").style.width = "0px";
      setTimeout(() => {
        document.getElementById("basket").style.borderWidth = "0px";
      }, 400);
    }
  }

  addToBasket (dish: Dish) {
    this.basketService.addToBasket(dish);
  }

  removeOneDish (dishTitle: string) {
    this.basketService.removeOneDish(dishTitle);
  }

  removeFromBasket (dishTitle: string) {
    this.basketService.removeFromBasket(dishTitle);
  }

  makeOrder () {
    alert("soon!");
  }

}
