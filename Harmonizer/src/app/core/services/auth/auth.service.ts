import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  
  isLoggedIn(): boolean {
    const token = localStorage.getItem('Token');
    return !!token; // Returns true if the token exists
  }
}
