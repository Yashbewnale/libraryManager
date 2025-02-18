import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterUsersService {

  uri: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  registerUser(username: string, password:string, fullName: string, email:string, phone:string, isAdmin: string): any{
    let uType = isAdmin === 'admin' ? true : false;
    return this.http.post(`${this.uri}/registerUser`, {username: username, password: password, fullName:fullName, email: email, phone: phone, isAdmin: uType});
  }
}
