import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = new Router();
  
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin');

  if(token && isAdmin === 'true'){
    return true;
  }
  // else if(token && isAdmin === 'false'){
  //   router.navigate(['/dashboard/studentDashboard']);
  //   return true;
  // }
  else{
    router.navigate(['/login']);
    return false;
  }
};
