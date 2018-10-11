import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin.service';
import { AlertService } from '../services/alert.service';
import { RoleService } from '../services/role.service';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { HttpConfig } from '../config';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private service: AdminService,
  			  private role: RoleService,
          private alertService: AlertService) {


  	this.role.getUserData ()
  	.subscribe (response => {
  		let loggedIn = this.role.checkData (response);

  		if (loggedIn == true && response.role >= 2) {
  			this.canPass = true;
  			this.getProducts ();
  			this.getUsers ();
        this.getMenu ();
  		}
  	});
  }

  canPass: boolean = false;
  products: Array<any> = [];
  menu: Array<any> = [];
  users: Array <any> = [];
  inputs: Array <any> = [];

  public uploader: FileUploader = new FileUploader({url: HttpConfig.serverLink + 'admin/upload/', itemAlias: 'photo'});

  ngOnInit () {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = true; };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('ImageUpload:uploaded:', item, status, response);
         this.alertService.addAlert('Success', 'Файл загружен успешно.');
     };
  }

  addProduct (name, amount, hours, minutes, seconds) {
  	this.service.addProduct (name, amount, [hours, minutes, seconds])
  	.subscribe (response => {
  		this.products.push ({name: name, value: amount, expire: response});
      this.alertService.addAlert('Success', 'Продукт добавлен успешно.');
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
    this.alertService.addAlert('Success', 'Роль сменена успешно.');
  }

  AddComponent () {
    this.inputs.push ({name: '', value: 0});
  }

  clearInputs () {
    this.inputs = [];
  }

  addInMenu (title, desc, price) {
    this.service.addInMenu (title, desc, price, this.inputs)
    .subscribe (() => {
      this.clearInputs ();
      this.alertService.addAlert('Success', 'Блюдо добавлено успешно.');
    });
  }

  removeDish (index) {
    this.service.removeDish (this.menu [index]._id)
    .subscribe ();
    this.menu.splice (index, 1);
    this.alertService.addAlert('Success', 'Блюдо удалено успешно.');
  }

  getMenu () {
    this.service.getMenu ()
    .subscribe (response => {
      this.menu = response;
    });
  }
}
