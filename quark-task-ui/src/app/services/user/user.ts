import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {KeycloakUser} from '../../models/user.enum';
import {KeycloakService} from '../keycloak/keycloak';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = '/api/users';

  constructor(private http: HttpClient, private keycloak: KeycloakService) {}

  getUsers(): Observable<KeycloakUser[]> {
    return this.http.get<KeycloakUser[]>(this.apiUrl, this.getHeaders());
  }

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.keycloak.getToken()
      })
    };
  }

}
