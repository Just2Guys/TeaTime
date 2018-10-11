import { Component, OnInit } from '@angular/core';

import { AlertService } from '../services/alert.service';

import { Alert } from '../alert.class';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})

export class AlertComponent implements OnInit {
  alerts: Array<Alert> = [];

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.alertService.alertEmit.subscribe(data => {
      this.alerts = data;
    });
  }

  removeAlert (id: number) {
    this.alertService.removeAlert(id);
  }

}
