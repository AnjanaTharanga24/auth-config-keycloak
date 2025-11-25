import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { KeycloakService } from '../../services/keycloak.service';

@Component({
  selector: 'app-protected',
  standalone: true,
  imports: [CommonModule, RouterModule], // Add RouterModule here
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card border-success">
            <div class="card-header bg-success text-white">
              <h4 class="mb-0">Protected Page</h4>
            </div>
            <div class="card-body text-center">
              <div class="py-4">
                <h3>Access Granted!</h3>
                <p class="lead">This page is protected and requires authentication.</p>
                
                <div class="alert alert-info mt-4">
                  <h5>Access Information</h5>
                  <p>You successfully accessed this protected route because you are authenticated.</p>
                  <p *ngIf="hasAppUserRole" class="text-success">✓ You have the 'app-user' role</p>
                  <p *ngIf="!hasAppUserRole" class="text-warning">⚠ You don't have 'app-user' role but page is accessible</p>
                </div>

                <div class="d-grid gap-2 d-md-block mt-4">
                  <button [routerLink]="['/']" class="btn btn-primary">Back to Home</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProtectedComponent implements OnInit {
  hasAppUserRole = false;

  constructor(private keycloakService: KeycloakService) {}

  ngOnInit() {
    this.hasAppUserRole = this.keycloakService.hasRole('app-user');
  }
}