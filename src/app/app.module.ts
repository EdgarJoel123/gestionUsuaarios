import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './Formulario/principal/principal.component';
import { LoginComponent } from './Formulario/login/login.component';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from "@angular/forms";

import { NavbarComponent } from './Formulario/navbar/navbar.component';
import { ListarComponent } from './Formulario/listar/listar.component';

import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    LoginComponent,
    NavbarComponent,
    ListarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
