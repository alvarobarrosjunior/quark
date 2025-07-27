import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { KeycloakService } from "./services/keycloak/keycloak";
import { App } from "./app";
import { AppRoutingModule } from "./app-routing-module";
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TaskListComponent } from './pages/task-list/task-list';
import { LoginComponent } from './pages/login/login';
import { CreateTaskComponent } from './pages/create-task/create-task';
import { TaskForm } from './components/task-form/task-form';
import {ReactiveFormsModule} from '@angular/forms';
import {MatOption, MatSelect} from '@angular/material/select';

export function kcFactory(kcService: KeycloakService) {
  return () => kcService.init();
}

@NgModule({
  declarations: [
    App,
    TaskListComponent,
    LoginComponent,
    CreateTaskComponent,
    TaskForm,
  ],
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatOption,
    MatSelect,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: APP_INITIALIZER,
      useFactory: kcFactory,
      deps: [KeycloakService],
      multi: true
    }
  ],
  bootstrap: [
    App
  ]
})
export class AppModule {}
