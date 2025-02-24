import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentDataService {

  constructor(private http: HttpClient) { }

  getAllStudents() {
    return this.http.get('http://localhost:3000/allStudents');
  }

  deleteStudent(_id: number) {
    return this.http.delete(`http://localhost:3000/deleteStudent/${_id}`);
  }

  searchStudents(searchText: string) {
    return this.http.get(`http://localhost:3000/searchStudent/${searchText}`);
  }
}
