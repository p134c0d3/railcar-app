import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { UserService } from './shared/user.service';
import { AuthenticationService } from './shared/authentication.service';
import { authTokenInterceptor } from './auth/auth-token.interceptor';
import { of } from 'rxjs';

export function initializeUserData(
  userService: UserService,
  authService: AuthenticationService) {
    if (authService.isLoggedIn()) {
      return () => userService.getBootstrapData().subscribe();
  } else {
    return () => of(null);
  }
}
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeUserData,
      deps: [UserService, AuthenticationService],
      multi: true,
    },
    provideHttpClient(withInterceptors([authTokenInterceptor]))
  ],
};
