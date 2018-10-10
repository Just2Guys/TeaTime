import  { Http, Response } from '@angular/http';
import	{ Injectable } from '@angular/core';

import { HttpConfig } from '../config';

import 'rxjs/add/operator/map';

@Injectable ()
export class RoleService {
	constructor (private http: Http) {

	}


	getUserData () {
		return this.http.get (HttpConfig.serverLink + "user/info", {withCredentials: true})
		.map ((res: Response) => res.json ());
	}

	checkData (data) {
		if (data == false) {
			return false;
		} else {
			return true;
		}
	}

}
