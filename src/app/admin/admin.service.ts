import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import { Settings } from '../config';

import 'rxjs/add/operator/map';

@Injectable ()
export class AdminService {
	constructor (private http: Http) {
		
	}

	addProduct (name, amount, expire) {
		let data = JSON.stringify ({
			name: name,
			value: amount, 
			expire: expire
		});

		let headers = new Headers ({'Content-type': 'application/json'});

		return this.http.post (Settings.serverLink + "admin/addProduct", data, {headers: headers, withCredentials: true})
		.map ((res: Response) => res.json ());
	}

	getProducts () {
  		return this.http.get (Settings.serverLink + "stock/products")
  		.map ((res: Response) => res.json ());
  	}

  	getUsers () {
  		return this.http.get (Settings.serverLink + "admin/users", {withCredentials: true})
  		.map ((res: Response) => res.json ());
  	}

  	changeRole (id, role) {
  		let data = JSON.stringify ({
  			id: id,
  			role: role
  		});

  		let headers = new Headers ({'Content-type': 'application/json'});

  		return this.http.post (Settings.serverLink + "admin/setRole", data, {headers: headers, withCredentials: true})
  		.map ((res: Response) =>  res.json ());
  	}
}	