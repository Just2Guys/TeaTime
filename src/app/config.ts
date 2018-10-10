import { Http, Response, JsonpModule, Headers, RequestOptions } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export let HttpConfig = {
  serverLink: "http://localhost:8080/",
  headers: new Headers({ 'Content-Type': 'application/json' }),
  options: new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) })
}
