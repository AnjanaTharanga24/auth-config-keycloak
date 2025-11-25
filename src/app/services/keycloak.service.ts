import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private _keycloak: Keycloak.KeycloakInstance;
  private _authenticated = false;

  constructor() {
    this._keycloak = Keycloak({
      url: 'http://localhost:8180',
      realm: 'angular-practice',
      clientId: 'angular-app'
    });
  }

  get keycloak() {
    return this._keycloak;
  }

  get authenticated() {
    return this._authenticated;
  }

  async init(): Promise<boolean> {
    try {
      this._authenticated = await this._keycloak.init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
        pkceMethod: 'S256'
      });

      console.log('Keycloak initialized', this._authenticated);
      
      if (this._authenticated) {
        console.log('User is logged in');
        console.log('User roles:', this.getUserRoles());
      }

      return this._authenticated;
    } catch (error) {
      console.error('Keycloak initialization failed:', error);
      return false;
    }
  }

  login(): void {
    this._keycloak.login();
  }

  logout(): void {
    this._keycloak.logout({ redirectUri: window.location.origin });
  }

  register(): void {
    this._keycloak.register();
  }

  getToken(): string | undefined {
    return this._keycloak.token;
  }

  getUserRoles(): string[] {
    if (this._keycloak.tokenParsed && this._keycloak.tokenParsed.realm_access) {
      return this._keycloak.tokenParsed.realm_access.roles || [];
    }
    return [];
  }

  hasRole(role: string): boolean {
    return this.getUserRoles().includes(role);
  }

  isLoggedIn(): boolean {
    return this._authenticated;
  }

  async loadUserProfile() {
    try {
      if (this._authenticated) {
        return await this._keycloak.loadUserProfile();
      }
      return null;
    } catch (error) {
      console.error('Failed to load user profile:', error);
      return null;
    }
  }

  getUsername(): string {
    // Fix: Use bracket notation to avoid TypeScript strict errors
    return (this._keycloak.tokenParsed as any)?.['preferred_username'] || 
           (this._keycloak.tokenParsed as any)?.['username'] || '';
  }

  getEmail(): string {
    // Fix: Use bracket notation to avoid TypeScript strict errors
    return (this._keycloak.tokenParsed as any)?.['email'] || '';
  }

  getFirstName(): string {
    return (this._keycloak.tokenParsed as any)?.['given_name'] || '';
  }

  getLastName(): string {
    return (this._keycloak.tokenParsed as any)?.['family_name'] || '';
  }
}