import { Component, OnInit } from '@angular/core';
import { Http, Response, JsonpModule, Headers, RequestOptions } from '@angular/http';

import { Settings } from '../config';
import { UserService } from '../services/user.service';
import { User, UserNull } from '../user.class';

import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User = UserNull;

  constructor(private http: Http, private userService: UserService) { }

  ngOnInit() {
    this.userService.changeUserData.subscribe(USER => {
      this.user = USER;
    });

    this.userService.getUserData();
  }

}
