import { Component, OnInit } from '@angular/core';
import { Http, Response, JsonpModule, Headers, RequestOptions } from '@angular/http';

import { HttpConfig } from '../config';
import { UserService } from '../services/user.service';
import { OrderService } from '../services/order.service';
import { AlertService } from '../services/alert.service';
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

  mapSizeX: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];
  mapSizeY: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];

  user: User = UserNull;
  haveOrder: boolean = false;
  formName: string;
  formSurname: string;
  car: any = [];

  constructor(private http: Http,
    private userService: UserService,
    private orderService: OrderService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.userService.changeUserData.subscribe(USER => {
      this.user = USER;
      this.formName = this.user.name;
      this.formSurname = this.user.surname;
    });

    this.orderService.getHaveOrder();
    this.orderService.changeHaveOrder.subscribe(HaveOrder => {
      this.haveOrder = HaveOrder;
      if (HaveOrder) {
        this.orderService.getCarCordinates();
      }
    });

    this.orderService.changeCarCordinates.subscribe(Car => {
      this.car = Car;
      for (let x = 1; x <= this.mapSizeX.length; x++) {
        for (let y = 1; y <= this.mapSizeY.length; y++) {
          document.getElementById("button_" + x + "_" + y).style.backgroundColor = "rgba(0, 0, 0, 0)";
        }
      }
      if (this.car.length == 0) {
        this.orderService.toggleHaveOrder();
        return;
      }
      for (let i = 0; i < this.car.length; i++) {
        document.getElementById("button_" + this.car[i][0] + "_" + this.car[i][1]).style.backgroundColor = "rgba(256, 0, 0, 0.7)";
      }
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
      this.alertService.addAlert("Info", "Заполните все поля!");
      return;
    }
    this.http.post(HttpConfig.serverLink + "user/updateData", JSON.stringify({userPassword: password, dataToChange: {name: name, surname: surname}}), {headers: HttpConfig.headers, withCredentials: true})
    .map((res:Response) => res.json())
    .subscribe(data => {
      if (data) {
        this.alertService.addAlert("Success", "Имя/Фамилия успешно изменены.");
        this.userService.getUserData();
        this.closeForm("change_name");
      } else {
        this.alertService.addAlert("Error", "Неверный пароль!");
      }
    });
  }

  changePass (oldPass: string, newPass: string, repeat: string) {
    if (newPass != repeat) {
      this.alertService.addAlert("Error", "Пароли не совпадают!");
      return;
    }
    this.http.post(HttpConfig.serverLink + "user/updateData", JSON.stringify({userPassword: oldPass, dataToChange: {newPassword: newPass}}), {headers: HttpConfig.headers, withCredentials: true})
    .map((res:Response) => res.json())
    .subscribe(data => {
      if (data) {
        this.alertService.addAlert("Success", "Пароль успешно изменен!");
        this.userService.getUserData();
        this.closeForm("change_pass");
      } else {
        this.alertService.addAlert("Error", "Неверный пароль!");
      }
    });
  }

}
