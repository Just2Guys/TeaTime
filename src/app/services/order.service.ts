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
      for (let i = 0; i < data.cords.length - 1; i++) {
        if (data.cords[i] == data.cords[i+1]) {
          this.car = [];
          for (let n = 0; n <= i; n++) {
            this.car.push(data.cords[n]);
          }
          break;
        }
      }
      this.changeCarCordinates.emit(this.car);
    });
  }



}
