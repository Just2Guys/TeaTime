import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, Response, JsonpModule, Headers, RequestOptions } from '@angular/http';

import { HttpConfig } from '../config';

import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class OrderService {
  haveOrder: boolean = false;
  @Output() changeHaveOrder: EventEmitter<boolean> = new EventEmitter();

  carId: any;
  @Output() changeCarId: EventEmitter<any> = new EventEmitter();

  carCords: any;
  @Output() changeCarCords: EventEmitter<any> = new EventEmitter();


  constructor (private http: Http) {}

  getHaveOrder () {
    this.http.get(HttpConfig.serverLink + "user/haveOrder", {withCredentials: true})
    .map ((res:Response) => res.json ())
    .subscribe (data => {
      this.haveOrder = data;
      this.changeHaveOrder.emit(this.haveOrder);
    });
  }

  toggleHaveOrder () {
    this.haveOrder = !this.haveOrder;
    this.changeHaveOrder.emit(this.haveOrder);
  }

  getCarId () {
    if (!this.haveOrder)
      return;
    this.http.get(HttpConfig.serverLink + "user/car", {withCredentials: true})
    .map ((res:Response) => res.json ())
    .subscribe(data => {
      this.carId = data._id;
      console.log(data._id);
      this.changeCarId.emit(this.carId);
    });
  }

  getCarCords () {
    if (!this.haveOrder)
      return;
    this.http.get(HttpConfig.serverLink + "user/car", {withCredentials: true})
    .map ((res:Response) => res.json ())
    .subscribe(data => {
      this.carCords = [];
      let moment = -1;
      for (let i = 0; i < data.cords.length - 1; i++) {
        if (data.cords[i][0] == data.cords[i+1][0] && data.cords[i][1] == data.cords[i+1][1]) {
          moment = i;
          break;
        }
      }
      for (let i = 0; i <= moment; i++) {
        this.carCords.push(data.cords[i]);
      }
      this.changeCarCords.emit(this.carCords);
    });
  }

  socketFunction (data: any) {
    this.http.get(HttpConfig.serverLink + "user/haveOrder", {withCredentials: true})
    .map ((res:Response) => res.json ())
    .subscribe (HaveOrder => {
      this.haveOrder = HaveOrder;
      this.changeHaveOrder.emit(this.haveOrder);
      if (this.haveOrder) {
        this.http.get(HttpConfig.serverLink + "user/car", {withCredentials: true})
        .map ((res:Response) => res.json ())
        .subscribe(Car => {
          this.carId = Car._id;
          this.changeCarId.emit(this.carId);
          if (data.id == this.carId) {
            this.getCarCords();
          }
        });
      }
    });
  }



}
