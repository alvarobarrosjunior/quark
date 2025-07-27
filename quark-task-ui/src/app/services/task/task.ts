import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {KeycloakService} from '../keycloak/keycloak';
import {Observable} from 'rxjs';
import {Task} from '../../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = '/api/tasks';

  constructor(private http: HttpClient, private keycloak: KeycloakService) {}

  getTasks(filters?: any): Observable<Task[]> {
    let params = new HttpParams();

    if (filters) {
      if (filters.id) params = params.set('id', filters.id);
      if (filters.titleOrDescription) params = params.set('titleOrDescription', filters.titleOrDescription);
      if (filters.owner) params = params.set('owner', filters.owner);
      if (filters.priority) params = params.set('priority', filters.priority);
    }

    return this.http.get<Task[]>(this.apiUrl, { params, ...this.getHeaders() });
  }

  addTask(task: Task): Observable<any> {
    return this.http.post(this.apiUrl, task, this.getHeaders());
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task, this.getHeaders());
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.getHeaders());
  }

  completeTask(id: number): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}/complete`, {}, this.getHeaders());
  }

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.keycloak.getToken()
      })
    };
  }
}
