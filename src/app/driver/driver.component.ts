import { Component, OnInit } from '@angular/core';
import { Http, Response, JsonpModule, Headers, RequestOptions } from '@angular/http';

import { UserService } from '../services/user.service';
import { Settings } from '../config';
import { User, UserNull } from '../user.class';

import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

class order {
  dishes: Array<string>;
  login: string;
  place: Array<number>;
}

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})

export class DriverComponent implements OnInit {
  user: User = UserNull;
  orders: Array<order> = [];

  constructor(private http: Http, private userService: UserService) {}

  ngOnInit() {
    this.refreshOrders();
    this.userService.getUserData();
    this.userService.changeUserData.subscribe(USER => {
      this.user = USER;
    });
  }

  refreshOrders () {
    this.http.get(Settings.serverLink + "driver/orders", {withCredentials: true})
    .map ((res:Response) => res.json ())
    .subscribe (data => {
      this.orders = [];
      for (let i = 0; i < data.length; i++) {
        this.orders.push({
          dishes: data[i].dishes,
          login: data[i].login,
          place: data[i].place
        });
      }
    });
  }

}
