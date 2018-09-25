import { Component, OnInit } from '@angular/core';
import { Http, Response, JsonpModule, Headers, RequestOptions } from '@angular/http';

import { UserService } from '../services/user.service';
import { DishClass } from '../dish.class';

import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  loggedIn: boolean;
  dishes: Array<DishClass> = [
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
    // {
    //   title: ,
    //   description: ,
    //   price: ,
    //   image: ,
    //   recipe:
    // },
    // {
    //   title: ,
    //   description: ,
    //   price: ,
    //   image: ,
    //   recipe:
    // }
  ];

  constructor(private http: Http, private userService: UserService) {}

  ngOnInit() {
    this.userService.change.subscribe(data => {
      this.loggedIn = data;
    });
  }


  showInfo (id) {
    document.getElementById("main_block_" + id).classList.add("main_block_active");
  }

  closeInfo (id) {
    document.getElementById("main_block_" + id).classList.remove("main_block_active");
  }

}
