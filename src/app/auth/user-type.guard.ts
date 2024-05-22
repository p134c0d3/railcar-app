import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const userTypeGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  const requiredUserType = route.data['requiredUserType'];

  // if (!requiredUserType) {
  //   return true;
  // }

  return userService.getBootstrapData().pipe(
    map((res) => {
      const user = res.current_user;
      // debugger;
      console.log(user.user_type, 'user type guard');
      if (user && user.user_type == requiredUserType) {
        // debugger
        return true;
      } else if (user && user.user_type == 'Pending') {
        router.navigate(['pending']);
        return false;
      } else {
        router.navigate(['login']);
        return false;
      }
    })
  );
};
