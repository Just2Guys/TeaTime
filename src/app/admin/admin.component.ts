import { Component, OnInit } from '@angular/core';
import { Http, Response, JsonpModule, Headers, RequestOptions } from '@angular/http';

import { Settings } from '../config';
import { UserService } from '../services/user.service';
import { User, UserNull } from '../user.class';

import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})


export class AdminComponent implements OnInit {
  user: User = UserNull;

  constructor(private http: Http, private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.user;
    this.userService.changeUserData.subscribe(USER => {
      this.user = USER;
    });
  }

}
