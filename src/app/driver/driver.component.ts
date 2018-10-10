import { Component, OnInit } from '@angular/core';
import { Http, Response, JsonpModule, Headers, RequestOptions } from '@angular/http';

import { UserService } from '../services/user.service';
import { HttpConfig } from '../config';
import { User, UserNull } from '../user.class';

import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})

export class DriverComponent implements OnInit {

  mapSizeX: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  mapSizeY: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  user: User = UserNull;
  orders: Array<object> = [];

  constructor(private http: Http, private userService: UserService) {}

  ngOnInit() {
    this.refreshOrders();
    this.userService.getUserData();
    this.userService.changeUserData.subscribe(USER => {
      this.user = USER;
    });
  }

  refreshOrders () {
    this.http.get(HttpConfig.serverLink + "driver/orders", {withCredentials: true})
    .map ((res:Response) => res.json ())
    .subscribe (data => {
      this.orders = data;
    });
  }

  triggerOrder (id: number, length: number) {
    for (let i = 0; i <= length; i++) {
      document.getElementById("dish_" + id + "_" + i).classList.toggle("dish_active");
    }
  }

  triggerRoad (id: number, place: Array<number>) {
    let y = place[0];
    let x = place[1];
    document.getElementById("button_" + x + "_" + y).classList.toggle("button_map_active");
  }

  takeOrder (order: object) {
    this.http.post(HttpConfig.serverLink + "driver/takeOrder", JSON.stringify({order: order}), {headers: HttpConfig.headers, withCredentials: true})
    .map((res:Response) => res.json())
    .subscribe(data => {
      alert("yes!");
    });
  }

}
