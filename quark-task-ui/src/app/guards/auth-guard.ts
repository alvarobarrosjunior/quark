import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {KeycloakService} from '../services/keycloak/keycloak';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private kc: KeycloakService, private router: Router) {}

  canActivate(): boolean {
    if (this.kc.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
