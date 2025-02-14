
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const token = localStorage.getItem('Token');

  if (token) {
    return true; // Allow access
  } else {
    router.navigate(['/login']); // Redirect to login page
    return false;
  }
};
