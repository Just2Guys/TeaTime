import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, Response, JsonpModule, Headers, RequestOptions } from '@angular/http';

import { User, UserNull } from '../user.class';
import { Settings } from '../config';

import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

  user: User = UserNull;
  @Output() changeUserData: EventEmitter<User> = new EventEmitter();

  constructor (private http: Http) {}

  setUserData (USER: User) {
    this.user = USER;
    this.user.loggedIn = true;
    this.changeUserData.emit(this.user);
  }

  clearUserData () {
    this.user = UserNull;
    this.changeUserData.emit(this.user);
  }

  getUserData () {
    this.http.get (Settings.serverLink + "user/info", {withCredentials: true})
    .map ((res:Response) => res.json ())
    .subscribe (data => {
      if (typeof data === "boolean")
        this.clearUserData ();
      else
        this.setUserData (data);
    });
  }



}
