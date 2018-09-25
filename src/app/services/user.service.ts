import { Injectable, Output, EventEmitter } from '@angular/core';
import { User } from '../user.class';

@Injectable()
export class UserService {

  user: User;
  @Output() changeUserData: EventEmitter<User> = new EventEmitter();

  setUserData (USER: User) {
    this.user = USER;
    this.changeUserData.emit(this.user);
  }



}
