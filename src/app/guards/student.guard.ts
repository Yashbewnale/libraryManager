import { CanActivateFn } from '@angular/router';

export const studentGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin');
  if (token && isAdmin === 'false') {
    return true;
  } else {
    return false;
  }
};
