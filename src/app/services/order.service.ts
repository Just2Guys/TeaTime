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



}
