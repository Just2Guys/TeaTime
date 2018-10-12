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

  car: Array<any> = [];
  @Output() changeCarCordinates: EventEmitter<any> = new EventEmitter();

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

  getCarCordinates () {
    this.http.get(HttpConfig.serverLink + "user/car", {withCredentials: true})
    .map ((res:Response) => res.json ())
    .subscribe(data => {
      if (data == null)
        return;
      let reverseMoment;
      for (let i = 1; i < data.cords.length; i++) {
        if (data.cords[i][0] == data.cords[i-1][0] && data.cords[i][1] == data.cords[i-1][1]) {
          reverseMoment = i;
          break;
        }
        if (i == data.cords.length - 1) {
          this.toggleHaveOrder();
          return;
        }
      }
      this.car = [];
      for (let i = 0; i < reverseMoment; i++) {
        this.car.push(data.cords[i]);
      }
      this.changeCarCordinates.emit(this.car);

    });
  }



}
