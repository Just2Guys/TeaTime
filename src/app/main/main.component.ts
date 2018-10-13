import { Component, OnInit } from '@angular/core';
import { Http, Response, JsonpModule, Headers, RequestOptions } from '@angular/http';

import { HttpConfig } from '../config';
import { UserService } from '../services/user.service';
import { User } from '../user.class';

import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})


export class MainComponent implements OnInit {
  user: User;
  currentSlide: number = 0;

  constructor(private http: Http, private userService: UserService) {}

  ngOnInit() {
    this.userService.changeUserData.subscribe(USER => {
      this.user = USER;
    });

    let slidesAmount = document.getElementsByClassName("slide").length
    document.getElementById("slider").style.width = 100 * slidesAmount + "%";
  }

  sliderNext () {
    this.currentSlide++;
    if (this.currentSlide >= document.getElementsByClassName("slide").length)
      this.currentSlide = 0;
    document.getElementById("slider").style.left = -100 * this.currentSlide + "%";
  }

  sliderPrev () {
    this.currentSlide--;
    if (this.currentSlide < 0)
      this.currentSlide = document.getElementsByClassName("slide").length - 1;
    document.getElementById("slider").style.left = -100 * this.currentSlide + "%";
  }



}
