import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { KeycloakService } from '../services/keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private keycloakService: KeycloakService, private router: Router) {}

  canActivate(): boolean {
    if (this.keycloakService.isLoggedIn()) {
      return true;
    } else {
      this.keycloakService.login();
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  
  constructor(private keycloakService: KeycloakService, private router: Router) {}

  canActivate(route: any): boolean {
    const requiredRole = route.data['role'];
    
    if (!this.keycloakService.isLoggedIn()) {
      this.keycloakService.login();
      return false;
    }

    if (requiredRole && !this.keycloakService.hasRole(requiredRole)) {
      alert('You do not have the required role to access this page!');
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}