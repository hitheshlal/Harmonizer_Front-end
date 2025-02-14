import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('Token');
  if(!token){
    return next(req)
    console.log("Token not found in local storage")
  }

   // Move shouldAddToken function outside the main interceptor function
   const shouldAddToken = (request: HttpRequest<unknown>): boolean => {
    // Check for both login and any other auth endpoints
    return !request.url.includes('/api/auth/login');
  };

    if (shouldAddToken(req)) {
      const newReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
      return next(newReq);

    }
  return next(req);

  // function shouldAddToken(req: HttpRequest<any>): boolean {
  //   return !req.url.includes('/api/auth/login')
  // }
};
