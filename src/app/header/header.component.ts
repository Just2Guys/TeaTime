import { Component, OnInit } from '@angular/core';
import { Http, Response, JsonpModule, Headers, RequestOptions } from '@angular/http';

import { User, UserNull } from '../user.class';
import { UserService } from '../services/user.service';
import { AlertService } from '../services/alert.service';
import { HttpConfig } from '../config';

import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User = UserNull;

  mainText = [
    "Регистрация",
    "Войти",
    "Меню",
    "Логин",
    "Пароль",
    "Повторите пароль",
    "Зарегестрироваться",
    "Имя",
    "Фамилия",
    "Вход",
    "Выход"
  ]

  userBarOpened = false;
  repeatPass: string;
  incorrectLogin: boolean;
  incorrectPassword: boolean;
  incorrectRepeat: boolean;

  constructor(private http: Http, private userService: UserService, private alertService: AlertService) { }

  ngOnInit() {
    this.userService.getUserData();

    this.userService.changeUserData.subscribe(USER => {
      this.user = USER;
    });
  }

  successedLogIn (data) {
    this.user = data;
    this.user.loggedIn = true;
    this.userService.setUserData(this.user);
  }



  openAppBar (main: string) {
    if (main == "reg") {
      this.closeAppBar("log");
      main = "div_reg";
    } else {
      this.closeAppBar("reg");
      main = "div_log";
    }
    let mainStyle = document.getElementById(main).style;
    mainStyle.display = "block";
    setTimeout(() => {
      mainStyle.top = "50%";
      setTimeout(() => {
        mainStyle.opacity = "1";
      }, 150);
    }, 1);
  }

  closeAppBar (main: string) {
    main = "div_" + main;
    let mainStyle = document.getElementById(main).style;
    mainStyle.opacity = "0";
    mainStyle.top = "20%";
    setTimeout(() => {
      mainStyle.display = "none";
    }, 501);
  }


  triggerUserButtonBar () {
    if (this.userBarOpened) {
      document.getElementById("user_bar").style.height = "0px";
      this.userBarOpened = false;
    } else {
      document.getElementById("user_bar").style.height = "80px";
      this.userBarOpened = true;
    }
  }



  postBarData (main: string) {
    let error = false;
    if (this.user.login == "") {
      this.alertService.addAlert("Error", "Incorrect login.");
      error = true;
    }
    if (this.user.password == "") {
      this.alertService.addAlert("Error", "Incorrect password.");
      error = true;
    } else
    if (this.repeatPass != this.user.password && main == "reg") {
      this.alertService.addAlert("Error", "Password have been repeated incorrectly");
      error = true;
    }
    if (!error) {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      if (main == "reg") {
        this.http.post(HttpConfig.serverLink + "user/register", JSON.stringify({data: this.user}), {headers: HttpConfig.headers, withCredentials: true})
        .map((res:Response) => res.json())
        .subscribe(data => {
          switch (data) {
            case 0:
              this.userService.setUserData(this.user);
              this.alertService.addAlert("Success", "Registered account " + this.user.login + ".");
              break;
            case 1:
              this.alertService.addAlert("Error", "Login must be less than 32 symbols.");
              break;
            case 2:
              this.alertService.addAlert("Error", "Name and surname must be less than 32 symbols.");
              break;
            case 3:
              this.alertService.addAlert("Error", "Password must be more than 4 symbols and less than 32 symbols");
              break;
            case 4:
              this.alertService.addAlert("Error", "This login already exsists.");
              break;
          }
        });
      } else {
          this.http.post(HttpConfig.serverLink + "user/login", JSON.stringify({login: this.user.login, password: this.user.password}), {headers: headers, withCredentials: true})
          .map((res:Response) => res.json())
          .subscribe(data => {
            if (data === false) {
              this.alertService.addAlert("Error", "Incorrect login or password.");
            } else
              this.userService.setUserData(data);
              this.alertService.addAlert("Success", "Welcome, " + this.user.login + ".");
          });
      }
    }
  }

  accountExit () {
    this.http.get(HttpConfig.serverLink + "user/exit", {withCredentials: true})
    .map((res:Response) => res.json())
    .subscribe(data => {
      if (data) {
        this.userBarOpened = false;
        this.userService.clearUserData();
        this.alertService.addAlert("Success", "Exit from account.");
      } else
        this.alertService.addAlert("Error", "Exit Error!");
    });
  }

  openProfile () {
    this.triggerUserButtonBar();
    document.getElementById("profile").style.display = "block";
    document.getElementById("profile_background").style.display = "block";
    setTimeout(() => {
      document.getElementById("profile").style.top = "50%";
      setTimeout(() => {
        document.getElementById("profile").style.opacity = "1";
        document.getElementById("profile_background").style.opacity = "1";
      }, 150);
    }, 1);
  }

  closeProfile () {
    document.getElementById("profile").style.top = "calc(50% - 250px)";
    document.getElementById("profile").style.opacity = "0";
    document.getElementById("profile_background").style.opacity = "0";
    setTimeout(() => {
      document.getElementById("profile").style.display = "none";
      document.getElementById("profile_background").style.display = "none";
    }, 300);
  }


}
