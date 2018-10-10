import { Component, OnInit } from '@angular/core';
import { Http, Response, JsonpModule, Headers, RequestOptions } from '@angular/http';

import { UserService } from '../services/user.service';
import { BasketService } from '../services/basket.service';
import { Dish } from '../dish.class';
import { HttpConfig } from '../config';
import { User, UserNull } from '../user.class';

import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  user: User = UserNull;
  dishes: Array<Dish> = [];
  menuIndex: number = 0;

  constructor(private http: Http, private userService: UserService, private basketService: BasketService) {}

  ngOnInit() {
    this.userService.getUserData();
    this.userService.changeUserData.subscribe(USER => {
      this.user = USER;
    });

    this.loadMenu();
  }

  loadMenu () {
    this.http.get (HttpConfig.serverLink + "stock/menu/" + this.menuIndex)
    .map ((res: Response) => res.json ())
    .subscribe (response => {
      if (response.length == 0) {
        document.getElementById("enableLoad").style.transform = "translateY(-50px)";
        document.getElementById("disableLoad").style.transform = "translateY(-50px)";
      } else {
        this.dishes = this.dishes.concat(response);
        this.menuIndex++;
      }
    });
  }


  showInfo (id) {
    if (this.user.loggedIn)
      document.getElementById("dish_add_" + id).classList.add("dish_add_active");
    document.getElementById("dish_price_" + id).classList.add("dish_price_active");
    document.getElementById("main_block_" + id).classList.add("main_block_active");
    document.getElementById("description_" + id).classList.add("description_active");
    for (let productId = 0; productId < this.dishes[id].recipe.length; productId++)
      document.getElementById("recipe_" + id + "_" + productId).classList.add("recipe_active");

  }

  closeInfo (id) {
    if (this.user.loggedIn)
      document.getElementById("dish_add_" + id).classList.remove("dish_add_active");
    document.getElementById("dish_price_" + id).classList.remove("dish_price_active");
    document.getElementById("description_" + id).classList.remove("description_active");
    for (let productId = 0; productId < this.dishes[id].recipe.length; productId++)
      document.getElementById("recipe_" + id + "_" + productId).classList.remove("recipe_active");
    document.getElementById("main_block_" + id).classList.remove("main_block_active");
  }

  addOne (title: string, price: string) {
    this.basketService.addOne(title, price);
  }

}
