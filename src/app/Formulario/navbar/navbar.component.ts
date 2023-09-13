import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router) {}

  cerrarSesion() {
    localStorage.setItem('token', '');
    localStorage.setItem('isLoggedIn', 'false');
    this.router.navigate(['/login']);
  }

}
