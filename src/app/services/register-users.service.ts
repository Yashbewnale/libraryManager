import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterUsersService {

  uri: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  registerAdmin(username: string, password:string): any{
    return this.http.post(`${this.uri}/registerAdmin`, {username: username, password: password});
  }
}
