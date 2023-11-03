import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServiceAutentificacionService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn') || 'false');

    if (isLoggedIn) {
      return true;
    } else {
      return false;
    }
  }
}

