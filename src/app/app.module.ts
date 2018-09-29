import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { UserService } from './services/user.service';
import { RoleService } from './services/role.service';
import { BasketService } from './services/basket.service';
import { AdminService } from './admin/admin.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { MainComponent } from './main/main.component';
import { AdminComponent } from './admin/admin.component';
import { BasketComponent } from './basket/basket.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    MainComponent,
    AdminComponent,
    BasketComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        component: MainComponent
      },
      {
        path: 'menu',
        component: MenuComponent
      },
      {
        path: 'admin',
        component: AdminComponent
      }
    ])
  ],
  providers: [
    UserService,
    RoleService,
    BasketService,
    AdminService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
