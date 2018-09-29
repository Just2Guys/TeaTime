import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin.service';
import { RoleService } from '../services/role.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  constructor(private service: AdminService,
  			  private role: RoleService) {


  	this.role.getUserData ()
  	.subscribe (response => {
  		let loggedIn = this.role.checkData (response);

  		if (loggedIn == true && response.role >= 2) {
  			this.canPass = true;
  			this.getProducts ();
  			this.getUsers ();
  		}
  	});
  }

  canPass: boolean = false;
  products: Array<any> = [];
  users: Array <any> = [];

  addProduct (name, amount, hours, minutes, seconds) {
  	this.service.addProduct (name, amount, [hours, minutes, seconds])
  	.subscribe (response => {
  		this.products.push ({name: name, value: amount, expire: response});
  	});
  }

  getProducts () {
  	this.service.getProducts ()
  	.subscribe (response => {
  		this.products = response;
  	});
  }

  getUsers () {
  	this.service.getUsers ()
  	.subscribe (response => {
  		this.users = response;
  	});
  }

  changeRole (id, role, index) {
  	this.service.changeRole (id, role)
  	.subscribe ();

  	this.users [index].role = role;
  }
}
