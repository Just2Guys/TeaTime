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

  openForm (main: string) {
    let mainStyle = document.getElementById("div_" + main).style;
    let background = document.getElementById("background_" + main).style;
    mainStyle.display = "block";
    background.display = "block";
    setTimeout(() => {
      mainStyle.top = "50%";
      background.opacity = "1";
      setTimeout(() => {
        mainStyle.opacity = "1";
      }, 150);
    }, 1);
  }

  closeForm (main: string) {
    let mainStyle = document.getElementById("div_" + main).style;
    let background = document.getElementById("background_" + main).style;
    mainStyle.opacity = "0";
    background.opacity = "0";
    mainStyle.top = "20%";
    setTimeout(() => {
      mainStyle.display = "none";
      background.display = "none";
    }, 501);
  }

  changeName (name: string, surname: string, password: string) {
    if (password != this.user.password) {
      alert("Incorrect password!");
    } else if (name == this.user.name && surname == this.user.surname) {
      alert("You've not changed anything!");
    } else {
      //POST
      alert("OK!");
    }
  }

  changePass (oldPass: string, newPass: string, repeat: string) {
    if (oldPass != this.user.password) {
      alert("Incorrect password!");
    } else if (newPass != repeat) {
      alert("You've repeated password incorrectly!")
    } else if (oldPass == newPass) {
      alert("Old password is similar to new!");
    } else {
      //POST
      alert("OK!");
    }
  }

}
