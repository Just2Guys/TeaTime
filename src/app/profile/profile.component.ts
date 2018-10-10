import { Component, OnInit } from '@angular/core';
import { Http, Response, JsonpModule, Headers, RequestOptions } from '@angular/http';

import { HttpConfig } from '../config';
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
  formName: string;
  formSurname: string;

  constructor(private http: Http, private userService: UserService) { }

  ngOnInit() {
    this.userService.changeUserData.subscribe(USER => {
      this.user = USER;
      this.formName = this.user.name;
      this.formSurname = this.user.surname;
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
    if (name == "" || surname == "") {
      alert("Заполните все поля!");
      return;
    }
    this.http.post(HttpConfig.serverLink + "user/updateData", JSON.stringify({userPrassword: password, dataToChange: {name: name, surname: surname}}), {headers: HttpConfig.headers, withCredentials: true})
    .map((res:Response) => res.json())
    .subscribe(data => {
      if (data) {
        alert("successed!");
      } else {
        alert("Incorrect password!");
      }
    });
  }

  changePass (oldPass: string, newPass: string, repeat: string) {
    if (newPass != repeat) {
      alert("You've repeated password incorrectly!");
      return;
    }
    this.http.post(HttpConfig.serverLink + "user/updateData", JSON.stringify({userPrassword: oldPass, dataToChange: {newPassword: newPass}}), {headers: HttpConfig.headers, withCredentials: true})
    .map((res:Response) => res.json())
    .subscribe(data => {
      if (data) {
        alert("successed!");
      } else {
        alert("Incorrect password!");
      }
    });
  }

}
