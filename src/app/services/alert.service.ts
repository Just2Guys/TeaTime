import { Injectable, Output, EventEmitter } from '@angular/core';
import { Alert } from '../alert.class';

@Injectable()
export class AlertService {
  alerts: Array<Alert> = [];

  @Output() alertEmit: EventEmitter<any> = new EventEmitter();

  addAlert (type: string, content: string) {
    let id;
    if (this.alerts.length == 0)
      id = 0;
    else
      id = this.alerts[this.alerts.length - 1].id + 1;
    this.alerts.push({type: type, content: content, id: id});
    setTimeout(() => {
      this.removeAlert(id);
    }, 3000);
    this.alertEmit.emit(this.alerts);
  }

  removeAlert (id: number) {
    for (let i = 0; i < this.alerts.length; i++) {
      if (this.alerts[i].id == id) {
        this.alerts.splice(i, 1);
      }
    }
    this.alertEmit.emit(this.alerts);
  }
}
