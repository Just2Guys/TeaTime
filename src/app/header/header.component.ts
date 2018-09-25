import { Component, OnInit } from '@angular/core';
import { Http, Response, JsonpModule, Headers, RequestOptions } from '@angular/http';

import { User } from '../user.class';
import { UserService } from '../services/user.service';
import { Settings } from '../config';

import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User = {
    role: 0,
    login: '',
    name: '',
    surname: '',
    password: ''
  }

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

  loggedIn = false;
  userBarOpened = false;
  repeatPass: string;
  error: string;
  incorrectLogin: boolean;
  incorrectPassword: boolean;
  incorrectRepeat: boolean;

  constructor(private http: Http, private userService: UserService) { }

  ngOnInit() {
    this.http.get (Settings.serverLink + "user/info", {withCredentials: true})
    .map ((res:Response) => res.json ())
    .subscribe (data => {

      if (typeof data === "boolean") {
        return false;
      }

      this.successedLogIn (data);
    });
  }

  successedLogIn (data) {
    this.loggedIn = true;
    this.user.role = data.role;
    this.user.name = data.name;
    this.user.surname = data.surname;
    this.user.login = data.login;
    this.userService.triggerSession();
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
    this.error = "";
    if (this.user.login == "") {
      this.error += "Incorrect login. ";
    }
    if (this.user.password == "") {
      this.error += "Incorrect password. ";
    } else
    if (this.repeatPass != this.user.password && main == "reg") {
      this.error += "Password's repeated incorrect";
    }
    if (this.error == "") {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      if (main == "reg") {
        this.http.post("http://localhost:8080/user/register", JSON.stringify({data: this.user}), {headers: headers, withCredentials: true})
        .map((res:Response) => res.json())
        .subscribe(data => {
          if (data) {
            this.loggedIn = true;
            this.userService.triggerSession();
          } else {
            this.error = "This account is.";
            this.showErrorMessage();
          }
        });
      } else {
          this.http.post("http://localhost:8080/user/login", JSON.stringify({login: this.user.login, password: this.user.password}), {headers: headers, withCredentials: true})
          .map((res:Response) => res.json())
          .subscribe(data => {

            if (data === false) {
              this.error = "Incorrect login or password.";
              this.showErrorMessage();
            } else
              this.successedLogIn(data);
          });
      }
    } else {
      this.showErrorMessage();
    }
  }

  accountExit () {
    this.http.get("http://localhost:8080/user/exit", {withCredentials: true})
    .map((res:Response) => res.json())
    .subscribe(data => {
      if (data) {
        this.loggedIn = false;
        this.userBarOpened = false;
        this.userService.triggerSession();
      }
    });
  }


  showErrorMessage () {
    document.getElementById("error_message").style.display = "block";
    setTimeout(() => {
      document.getElementById("error_message").style.opacity = "1";
    }, 1);
    setTimeout(() => {
      document.getElementById("error_message").style.opacity = "0";
      setTimeout(() => {
        document.getElementById("error_message").style.display = "none";
      }, 501);
    }, 3000);
  }

}
