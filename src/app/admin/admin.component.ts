import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin.service';
import { RoleService } from '../services/role.service';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { Settings } from '../config';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

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
  inputs: Array <any> = [];

  public uploader: FileUploader = new FileUploader({url: Settings.serverLink + 'admin/upload/', itemAlias: 'photo'});

  ngOnInit () {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = true; };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('ImageUpload:uploaded:', item, status, response);
         alert('File uploaded successfully');
     };

    this.uploader.onBeforeUploadItem = (fileItem: any) => {
      fileItem.formData.push( { someField: "hekko" } );
      fileItem.formData.push( { someField2: "ui" } );
    };
  }

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
    });
  }
}
