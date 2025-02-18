import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Optional: method to log out
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);

  }
}
