import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({ providedIn: 'root' })
export class KeycloakService {

  keycloak!: Keycloak.KeycloakInstance;

  init(): Promise<void> {
    this.keycloak = new Keycloak({
      url: 'http://localhost:8080',
      realm: 'quark-task',
      clientId: 'quark-task',
    });
    return new Promise((resolve, reject) => {
      this.keycloak.init({
        onLoad: 'login-required',
        checkLoginIframe: false
      }).then((authenticated) => {
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  }

  getToken(): string {
    return this.keycloak.token ?? '';
  }

  logout(): void {
    this.keycloak.logout();
  }

  isAuthenticated(): boolean {
    return !!this.keycloak?.authenticated;
  }
}
