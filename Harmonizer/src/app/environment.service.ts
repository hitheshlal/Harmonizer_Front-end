import { Injectable } from '@angular/core';

declare global {
  interface Window {
    env?: {
      apiUrl: string;
      googleClientId: string;
      // Add other environment variables as needed
    };
  }
}
@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  constructor() { }

  get apiUrl(): string {
    return window.env?.apiUrl || 'default-api-url';
  }

  get googleClientId(): string {
    return (window as any)['env']?.googleClientId || 'default-value';
  }
}
