import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { KeycloakService } from '../../services/keycloak.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule], // Add RouterModule here
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header bg-primary text-white">
              <h3 class="mb-0">Keycloak Angular Practice</h3>
            </div>
            <div class="card-body text-center">
              
              <!-- Not Logged In State -->
              <div *ngIf="!isLoggedIn" class="py-4">
                <h4 class="text-muted mb-4">Welcome! Please authenticate</h4>
                <div class="d-grid gap-2 d-md-block">
                  <button (click)="login()" class="btn btn-primary btn-lg me-md-2">Login</button>
                  <button (click)="register()" class="btn btn-outline-primary btn-lg">Register</button>
                </div>
              </div>

              <!-- Logged In State -->
              <div *ngIf="isLoggedIn" class="py-4">
                <div class="alert alert-success">
                  <h4>Successfully Logged In!</h4>
                </div>
                
                <div class="row text-start mb-4">
                  <div class="col-md-6"><strong>Username:</strong> {{username}}</div>
                  <div class="col-md-6"><strong>Email:</strong> {{email}}</div>
                </div>

                <div class="mb-4">
                  <span class="badge bg-{{hasAppUserRole ? 'success' : 'warning'}} fs-6">
                    app-user role: {{hasAppUserRole ? 'YES' : 'NO'}}
                  </span>
                </div>

                <div class="mb-4">
                  <h5>Your Roles:</h5>
                  <div *ngFor="let role of roles" class="badge bg-info me-1">{{role}}</div>
                  <div *ngIf="roles.length === 0" class="text-muted">No roles assigned</div>
                </div>

                <div class="d-grid gap-2 d-md-block">
                  <button [routerLink]="['/profile']" class="btn btn-info me-md-2">View Profile</button>
                  <button [routerLink]="['/protected']" class="btn btn-warning me-md-2">Protected Page</button>
                  <button (click)="logout()" class="btn btn-danger">Logout</button>
                </div>
              </div>

            </div>
          </div>

          <!-- Token Information -->
          <div *ngIf="isLoggedIn" class="card mt-4">
            <div class="card-header bg-secondary text-white">
              <h5 class="mb-0">Token Information</h5>
            </div>
            <div class="card-body">
              <div class="mb-2">
                <strong>Token:</strong> 
                <code class="d-block text-truncate">{{token}}</code>
              </div>
              <details>
                <summary>View Full Token Payload</summary>
                <pre class="mt-2 p-2 bg-light rounded">{{tokenParsed | json}}</pre>
              </details>
            </div>
          </div>

        </div>
      </div>
    </div>
  `
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;
  username = '';
  email = '';
  roles: string[] = [];
  hasAppUserRole = false;
  token = '';
  tokenParsed: any;

  constructor(private keycloakService: KeycloakService) {}

  async ngOnInit() {
    this.isLoggedIn = this.keycloakService.isLoggedIn();
    
    if (this.isLoggedIn) {
      this.username = this.keycloakService.getUsername();
      this.email = this.keycloakService.getEmail();
      this.roles = this.keycloakService.getUserRoles();
      this.hasAppUserRole = this.keycloakService.hasRole('app-user');
      this.token = this.keycloakService.getToken() || '';
      this.tokenParsed = this.keycloakService.keycloak.tokenParsed;
    }
  }

  login() {
    this.keycloakService.login();
  }

  logout() {
    this.keycloakService.logout();
  }

  register() {
    this.keycloakService.register();
  }
}