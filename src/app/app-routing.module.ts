import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Formulario/login/login.component';
import { PrincipalComponent } from './Formulario/principal/principal.component';
import { ServiceAutentificacionService } from './Services/service-autentificacion.service';

import { ListarComponent } from './Formulario/listar/listar.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Ruta para el componente de inicio de sesión
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirigir a la página de inicio de sesión por defecto
  { path: 'principal', component: PrincipalComponent, canActivate: [ServiceAutentificacionService] },
  { path: 'listar', component: ListarComponent, canActivate: [ServiceAutentificacionService] },

 

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: false, onSameUrlNavigation: "reload" })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
