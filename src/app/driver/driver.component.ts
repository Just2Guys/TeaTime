import { Component, OnInit } from '@angular/core';
import { Http, Response, JsonpModule, Headers, RequestOptions } from '@angular/http';

import { UserService } from '../services/user.service';
import { AlertService } from '../services/alert.service';
import { HttpConfig } from '../config';
import { User, UserNull } from '../user.class';

import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Socket } from "ngx-socket-io";

class Dish {
  title: string;
  count: number;
}

class Order {
  dishes: Array<Dish>;
  place: Array<number>;
  login: string;
  price: number;
}

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})

export class DriverComponent implements OnInit {

  mapSizeX: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];
  mapSizeY: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];

  user: User = UserNull;
  orders: Array<Order> = [];
  ordersData: Array<any> = [];

  constructor(
    private http: Http,
    private userService: UserService,
    private socket: Socket,
    private alertService: AlertService
    ) {
    this.socket.on ("driverDeleteOrder", id => {
      for (let elemenet of this.ordersData) {
        let index = this.ordersData.indexOf (elemenet);

        if (elemenet._id === id) {
          this.hideWay(this.orders[index]);
          this.orders.splice (index, 1);
          this.ordersData.splice (index, 1);
          break
        }
      }
    });


    this.socket.on ("driverNewOrder", order => {
      this.orders.push (order);
    });
  }

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
      this.ordersData = data;
      this.orders = [];
      for (let n = 0; n < data.length; n++) {
        this.orders.push({
          dishes: [],
          place: data[n].place,
          login: data[n].login,
          price: data[n].price
        });
        for (let m = 0; m < data[n].dishes.length; m++) {
          if (m == 0) {
            this.orders[n].dishes.push({
              title: data[n].dishes[m],
              count: 1
            });
          } else if (data[n].dishes[m] == data[n].dishes[m - 1]) {
            let length = this.orders[n].dishes.length;
            this.orders[n].dishes[length - 1].count++;
          } else {
            this.orders[n].dishes.push({
              title: data[n].dishes[m],
              count: 1
            });
          }
        }
      }
    });
  }

  triggerOrder (id: number, length: number) {
    for (let i = 0; i <= length; i++) {
      document.getElementById("dish_" + id + "_" + i).classList.toggle("dish_active");
    }
  }

  showWay (order) {
    let y = order.place[1];
    let x = order.place[0];
    document.getElementById("driver_button_" + x + "_" + y).classList.add("driver_button_active");
  }

  hideWay (order) {
    let y = order.place[1];
    let x = order.place[0];
    document.getElementById("driver_button_" + x + "_" + y).classList.remove("driver_button_active");
  }

  takeOrder (id: number) {
    this.http.post(HttpConfig.serverLink + "driver/takeOrder", JSON.stringify({order: this.ordersData[id]}), {headers: HttpConfig.headers, withCredentials: true})
    .map((res:Response) => res.json())
    .subscribe(data => {
      this.alertService.addAlert("Success", "You have just taken an order.");
    });
  }

  removeOrder (login: string) {
    for (let i = 0; i < this.orders.length; i++) {
      if (this.orders[i].login == login) {
        this.orders.splice(i, 1);
        this.ordersData.splice(i, 1);
        return;
      }
    }
  }

}
