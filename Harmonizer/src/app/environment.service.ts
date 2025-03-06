import { Injectable } from '@angular/core';

declare global {
  interface Window {
    env: {
      apiUrl: string;
      googleClientId: string;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  private apiUrl = '';
  private googleClientId = '';

  constructor() {
    // Get values from window.env if available
    console.log("window env : ",window['env'])
    console.log("window env : ",window.env?.apiUrl);
    console.log("window env : ",window.env?.googleClientId);

    if (window['env']) {
      this.apiUrl = window['env']['apiUrl'] || this.apiUrl;
      this.googleClientId = window['env']['googleClientId'] || this.googleClientId;
    }
  }

  getApiUrl(): string {
    return this.apiUrl;
  }

  getGoogleClientId(): string {
    return this.googleClientId;
  }

}
