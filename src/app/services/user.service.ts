import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class UserService {

  loggedIn: boolean = false;

  @Output() change: EventEmitter<boolean> = new EventEmitter();

  triggerSession () {
    this.loggedIn = !this.loggedIn;
    this.change.emit(this.loggedIn);
  }

}
