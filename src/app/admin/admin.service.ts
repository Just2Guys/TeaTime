import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import { HttpConfig } from '../config';

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

		return this.http.post (HttpConfig.serverLink + "admin/addProduct", data, {headers: headers, withCredentials: true})
		.map ((res: Response) => res.json ());
	}

	getProducts () {
  		return this.http.get (HttpConfig.serverLink + "stock/products")
  		.map ((res: Response) => res.json ());
  	}

  	getUsers () {
  		return this.http.get (HttpConfig.serverLink + "admin/users", {withCredentials: true})
  		.map ((res: Response) => res.json ());
  	}

  	changeRole (id, role) {
  		let data = JSON.stringify ({
  			id: id,
  			role: role
  		});

  		let headers = new Headers ({'Content-type': 'application/json'});

  		return this.http.post (HttpConfig.serverLink + "admin/setRole", data, {headers: headers, withCredentials: true})
  		.map ((res: Response) =>  res.json ());
  	}


    addInMenu (title, desc, price, inputs) {

      let data = JSON.stringify ({
        title: title,
        description: desc,
        price: price,
        recipe: inputs
      });

      let headers = new Headers ({'Content-type': 'application/json'});
      return this.http.post (HttpConfig.serverLink + "admin/addInMenu", data, {headers: headers, withCredentials: true})
      .map ((res: Response) => res.json ());
    }
}
