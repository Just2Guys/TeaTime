import { Injectable, Output, EventEmitter } from '@angular/core';
import { User, UserNull } from '../user.class';

@Injectable()
export class UserService {

  user: User = UserNull;
  @Output() changeUserData: EventEmitter<User> = new EventEmitter();

  setUserData (USER: User) {
    this.user = USER;
    this.changeUserData.emit(this.user);
  }



}
