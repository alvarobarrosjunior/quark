import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {KeycloakService} from '../keycloak/keycloak';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = '/api/tasks';

  constructor(private http: HttpClient, private keycloak: KeycloakService) {}

  getTasks(): Observable<any> {
    return this.http.get(this.apiUrl, this.getHeaders());
  }

  addTask(task: any): Observable<any> {
    return this.http.post(this.apiUrl, task, this.getHeaders());
  }

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.keycloak.getToken()
      })
    };
  }
}
