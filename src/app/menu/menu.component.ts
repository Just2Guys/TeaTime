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
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  user: User;
  dishes: Array<Dish> = [
    {
      title: "soup",
      description: "Just a soup",
      price: 120.5,
      image: "https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fimg1.cookinglight.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2Fimage%2F2017%2F08%2Fmain%2Ffire-roasted-tomato-basil-soup-1709p63.jpg%3Fitok%3DLIRxiAm0&w=800&q=85",
      recipe: [
        {
          name: "pickle",
          value: 0.3
        },
        {
          name: "tomato",
          value: 0.5
        },
        {
          name: "whater",
          value: 1
        }
      ]
    },
    {
      title: "steak",
      description: "Great steak",
      price: 215,
      image: "https://hips.hearstapps.com/vidthumb/images/delish-cajun-butter-steak-still006-1528495387.jpg",
      recipe: [
        {
          name: "meat",
          value: 0.5
        },
        {
          name: "tomato",
          value: 0.3
        },
        {
          name: "cheese",
          value: 0.4
        },
        {
          name: "cucamber",
          value: 0.2
        }
      ]
    }
  ];

  constructor(private http: Http, private userService: UserService, private basketService: BasketService) {}

  ngOnInit() {
    this.userService.changeUserData.subscribe(USER => {
      this.user = USER;
    });
  }


  showInfo (id) {
    document.getElementById("dish_price_" + id).classList.add("dish_price_active");
    document.getElementById("dish_add_" + id).classList.add("dish_add_active");
    document.getElementById("main_block_" + id).classList.add("main_block_active");
    document.getElementById("description_" + id).classList.add("description_active");
    for (let productId = 0; productId < this.dishes[id].recipe.length; productId++)
      document.getElementById("recipe_" + id + "_" + productId).classList.add("recipe_active");

  }

  closeInfo (id) {
    document.getElementById("dish_price_" + id).classList.remove("dish_price_active");
    document.getElementById("dish_add_" + id).classList.remove("dish_add_active");
    document.getElementById("description_" + id).classList.remove("description_active");
    for (let productId = 0; productId < this.dishes[id].recipe.length; productId++)
      document.getElementById("recipe_" + id + "_" + productId).classList.remove("recipe_active");
    setTimeout(() => {
      document.getElementById("main_block_" + id).classList.remove("main_block_active");
    }, 100)
  }

  addOne (title: string, price: string) {
    this.basketService.addOne(title, price);
  }

}
