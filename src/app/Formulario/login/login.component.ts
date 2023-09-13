import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { ServiceAutentificacionService } from 'src/app/Services/service-autentificacion.service';
import { ServiceService } from 'src/app/Services/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formData = {
    username: '',
    password: ''
  };

  constructor(
    public autentificacion: ServiceAutentificacionService,
    private router: Router,
    private http: HttpClient,
    private service: ServiceService
  ) {
    if (autentificacion.canActivate()) {
      this.router.navigate(['/listar']);
    }
  }

  validarUsuario(formulario: any) {
    const url = 'https://app.eeasa.com.ec/WSSisgerhServices/rest/security/validarUsuario';
    const cuenta = btoa(formulario.username);
    const clave = btoa(formulario.password);

    const params = {
      inDsgus_cuenta: cuenta,
      inDsgus_clave: clave
    };

    this.http.get(url, { params }).pipe(
      switchMap((response: any) => {
        if (response.STATE === 'OK') {
          alert("Usuario Valido")
          const username = formulario.username;
          //console.log(username);
          return this.service.getUsername(username);
        } else {
          throw new Error('Usuario no válido revise su username o su contraseña');
        }
      }),
      // ...

      map((usernameResponseArray: any[]) => {
        const usernameResponse = usernameResponseArray[0]; // Acceder al primer elemento
        /*console.log('usernameResponse:', usernameResponse);
        console.log('id_ROL:', usernameResponse.id_ROL);*/
        if (usernameResponse.id_ROL === 1) {
          return 'Usted es un admin y tiene al sistema.';
        } else {
          throw new Error('Usted no es un admin y no tiene acceso al sistema');
        }
      })

    ).subscribe(
      (message: string) => {
        alert(message);
        localStorage.setItem('isLoggedIn', 'true');
        this.router.navigate(['/listar']);
      },
      (error) => {
        console.error(error);
        alert(error.message);
        formulario.username = '';
        formulario.password = '';
      }
    );
  }
}
