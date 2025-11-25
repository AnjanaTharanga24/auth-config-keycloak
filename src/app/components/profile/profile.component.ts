import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeycloakService } from '../../services/keycloak.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule], // Add CommonModule for ngIf
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header bg-info text-white">
              <h4 class="mb-0">User Profile</h4>
            </div>
            <div class="card-body">
              <div *ngIf="profile" class="profile-info">
                <div class="mb-3">
                  <strong>Username:</strong>
                  <div class="form-control">{{profile.username}}</div>
                </div>
                <div class="mb-3">
                  <strong>Email:</strong>
                  <div class="form-control">{{profile.email}}</div>
                </div>
                <div class="mb-3">
                  <strong>First Name:</strong>
                  <div class="form-control">{{profile.firstName || 'Not set'}}</div>
                </div>
                <div class="mb-3">
                  <strong>Last Name:</strong>
                  <div class="form-control">{{profile.lastName || 'Not set'}}</div>
                </div>
              </div>
              <div *ngIf="!profile" class="text-center">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-2">Loading profile...</p>
              </div>
              <div class="d-grid gap-2">
                <button (click)="goBack()" class="btn btn-secondary">Back to Home</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProfileComponent implements OnInit {
  profile: any = null;

  constructor(private keycloakService: KeycloakService) {}

  async ngOnInit() {
    this.profile = await this.keycloakService.loadUserProfile();
  }

  goBack() {
    window.history.back();
  }
}