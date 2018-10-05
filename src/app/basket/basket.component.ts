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

  mapSizeX: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  mapSizeY: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  openedBusket: boolean = false;
  basket: Array<object>;
  user: User = UserNull;

  constructor(private http: Http, private userService: UserService, private basketService: BasketService) { }

  ngOnInit() {
    this.userService.getUserData();
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
      document.getElementById("basket_button").style.right = "400px";
      document.getElementById("basket_button").style.borderRadius = "2px 0px 0px 2px";
      document.getElementById("basket").style.width = "400px";
      document.getElementById("basket").style.boxShadow = "0px 0px 2px rgba(0,0,0,0.5)";
    } else {
      this.openedBusket = false;
      document.getElementById("stick_1").style.transform = "rotate3d(0, 0, 1, 45deg)";
      document.getElementById("stick_2").style.transform = "rotate3d(0, 0, 1, -45deg)";
      document.getElementById("basket_button").style.borderRadius = "30px 0px 0px 30px";
      document.getElementById("basket_button").style.right = "0px";
      document.getElementById("basket").style.width = "0px";
      document.getElementById("basket").style.boxShadow = "0px 0px 0px rgba(0,0,0,0.5)";
    }
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
    document.getElementById("last_step").style.display = "block";
    document.getElementById("last_step_background").style.display = "block";
    setTimeout(() => {
      document.getElementById("last_step").style.transform = "translate(-50%, -50%)";
      setTimeout(() => {
        document.getElementById("last_step").style.opacity = "1";
        document.getElementById("last_step_background").style.opacity = "1";
      }, 150);
    }, 1);
  }

  closeLastStep () {
    document.getElementById("last_step").style.transform = "translate(-50%, calc(-50% - 250px))";
    document.getElementById("last_step").style.opacity = "0";
    document.getElementById("last_step_background").style.opacity = "0";
    setTimeout(() => {
      document.getElementById("last_step").style.display = "none";
      document.getElementById("last_step_background").style.display = "none";
    }, 300);
  }

  sendCoordinates (x: number, y: number) {
    for (let i = 0; i < document.getElementsByClassName("button_active").length; i++) {
      document.getElementsByClassName("button_active")[i].classList.remove("button_active");
    }
    document.getElementById("button_" + x + "_" + y).classList.add("button_active");
  }

}
