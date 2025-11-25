import { Component } from '@angular/core';
import { KeycloakService } from './services/keycloak.service';

@Component({
  selector: 'app-root',
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" routerLink="/">
          <i class="fas fa-shield-alt"></i> Keycloak Angular
        </a>
        
        <div class="navbar-nav ms-auto">
          <a class="nav-link" routerLink="/" routerLinkActive="active">
            <i class="fas fa-home"></i> Home
          </a>
          <a class="nav-link" routerLink="/profile" routerLinkActive="active" *ngIf="isLoggedIn">
            <i class="fas fa-user"></i> Profile
          </a>
          <a class="nav-link" routerLink="/protected" routerLinkActive="active" *ngIf="isLoggedIn">
            <i class="fas fa-lock"></i> Protected
          </a>
          <span class="navbar-text ms-3" *ngIf="isLoggedIn">
            <i class="fas fa-user-circle"></i> {{username}}
          </span>
        </div>
      </div>
    </nav>

    <router-outlet></router-outlet>

    <footer class="bg-light text-center py-3 mt-5">
      <div class="container">
        <p class="text-muted mb-0">Keycloak Angular Practice App</p>
      </div>
    </footer>
  `,
  styles: [`
    .active { font-weight: bold; }
  `]
})
export class AppComponent {
  isLoggedIn = false;
  username = '';

  constructor(private keycloakService: KeycloakService) {}

  ngOnInit() {
    this.isLoggedIn = this.keycloakService.isLoggedIn();
    this.username = this.keycloakService.getUsername();
  }
}