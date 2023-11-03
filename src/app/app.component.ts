import { Component } from '@angular/core';
import { ServiceAutentificacionService } from './Services/service-autentificacion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyectosDPusuarios';
  
  constructor(private service: ServiceAutentificacionService){}

  isLoggedIn(): boolean {
    return this.service.canActivate();
  }
}
