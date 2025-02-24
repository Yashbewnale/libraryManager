import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthServiceService {

  uri = 'http://localhost:3000';


  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string, isAdmin:boolean): any {
    return this.http.post(`${this.uri}/userLogin`, { username: username, password: password, isAdmin: isAdmin });
  }

  // Check if the user is logged in
  isLoggedIn() {
    if(!!localStorage.getItem('token')){
      if(localStorage.getItem('isAdmin')=== 'true'){
        return 1;
    } else {
        return 2;
    }
  }
  return false;
}

  // Optional: method to log out
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isLoggedIn');
    localStorage.clear();
    this.router.navigate(['/login']);

  }

}
