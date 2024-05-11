import { HttpInterceptorFn } from '@angular/common/http';
import { AuthenticationService } from '../shared/authentication.service';
import { inject } from '@angular/core';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService);

  if (authService.isLoggedIn()) {
    debugger;
    const authToken = authService.getToken();
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`),

    })

    return next(authReq);
  }
  return next(req);
};
