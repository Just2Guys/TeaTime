export class User {
  role: number;
  login: string;
  name: string;
  surname: string;
  password: string;
  loggedIn: boolean;
}

export let UserNull: User = {
  role: 0,
  login: '',
  name: '',
  surname: '',
  password: '',
  loggedIn: false
}
