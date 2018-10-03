import { Component, OnInit } from '@angular/core';
import { Http, Response, JsonpModule, Headers, RequestOptions } from '@angular/http';

import { User, UserNull } from '../user.class';
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
  error: string;
  incorrectLogin: boolean;
  incorrectPassword: boolean;
  incorrectRepeat: boolean;

  constructor(private http: Http, private userService: UserService) { }

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
        this.http.post(Settings.serverLink + "user/register", JSON.stringify({data: this.user}), {headers: headers, withCredentials: true})
        .map((res:Response) => res.json())
        .subscribe(data => {
          switch (data) {
            case 0:
              this.userService.setUserData(this.user);
              break;
            case 1:
              this.error = "Login must be less than 32 symbols.";
              this.showErrorMessage();
              break;
            case 2:
              this.error = "Name and surname must be less than 32 symbols.";
              this.showErrorMessage();
              break;
            case 3:
              this.error = "Password must be more than 4 symbols and less than 32 symbols";
              this.showErrorMessage();
              break;
            case 4:
              this.error = "This login exsist.";
              this.showErrorMessage();
              break;
          }
        });
      } else {
          this.http.post(Settings.serverLink + "user/login", JSON.stringify({login: this.user.login, password: this.user.password}), {headers: headers, withCredentials: true})
          .map((res:Response) => res.json())
          .subscribe(data => {
            if (data === false) {
              this.error = "Incorrect login or password.";
              this.showErrorMessage();
            } else
              this.userService.setUserData(data);
          });
      }
    } else {
      this.showErrorMessage();
    }
  }

  accountExit () {
    this.http.get(Settings.serverLink + "user/exit", {withCredentials: true})
    .map((res:Response) => res.json())
    .subscribe(data => {
      if (data) {
        this.userBarOpened = false;
        this.userService.clearUserData();
      } else
        alert("Exit error!");
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
