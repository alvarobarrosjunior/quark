import {Component, OnInit} from '@angular/core';
import {KeycloakService} from '../../services/keycloak/keycloak';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent implements OnInit {
  constructor(private keycloakService: KeycloakService, private router: Router) {}

  ngOnInit() {
    if (!this.keycloakService.isAuthenticated()) {
      this.login();
    } else {
      this.router.navigate(['/tasks']);
    }
  }

  login(): void {
    this.keycloakService.keycloak.login();
  }
}
