import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  openedBusket: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  triggerBasket () {
    if (!this.openedBusket) {
      this.openedBusket = true;
      document.getElementById("stick_1").style.transform = "rotate3d(-1, -2.4, 0, 180deg)";
      document.getElementById("stick_2").style.transform = "rotate3d(-1, 2.4, 0, 180deg)";
      document.getElementById("basket_button").style.borderRadius = "2px 0px 0px 2px";
      document.getElementById("basket_button").style.right = "400px";
      document.getElementById("basket").style.width = "400px";
      document.getElementById("basket").style.borderWidth = "1px 0px 1px 1px";
    } else {
      this.openedBusket = false;
      document.getElementById("stick_1").style.transform = "rotate3d(0, 0, 1, 45deg)";
      document.getElementById("stick_2").style.transform = "rotate3d(0, 0, 1, -45deg)";
      document.getElementById("basket_button").style.borderRadius = "30px 0px 0px 30px";
      document.getElementById("basket_button").style.right = "0px";
      document.getElementById("basket").style.width = "0px";
      setTimeout(() => {
        document.getElementById("basket").style.borderWidth = "0px";
      }, 400);
    }
  }

}
