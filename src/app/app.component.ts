import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { KeycloakService } from './services/keycloak.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule], // Make sure these are imported
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" routerLink="/">Keycloak Angular</a>
        
        <div class="navbar-nav ms-auto">
          <a class="nav-link" routerLink="/" routerLinkActive="active">Home</a>
          <a class="nav-link" routerLink="/profile" routerLinkActive="active" *ngIf="isLoggedIn">Profile</a>
          <a class="nav-link" routerLink="/protected" routerLinkActive="active" *ngIf="isLoggedIn">Protected</a>
          <span class="navbar-text ms-3" *ngIf="isLoggedIn">{{username}}</span>
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
export class AppComponent implements OnInit {
  isLoggedIn = false;
  username = '';

  constructor(private keycloakService: KeycloakService) {}

  ngOnInit() {
    this.isLoggedIn = this.keycloakService.isLoggedIn();
    this.username = this.keycloakService.getUsername();
  }
}