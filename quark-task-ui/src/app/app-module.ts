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
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MY_DATE_FORMATS} from './format/date-format';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {TaskDialogComponent} from './components/task-dialog/task-dialog';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';

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
    TaskDialogComponent,
    Header,
    Footer,
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
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
