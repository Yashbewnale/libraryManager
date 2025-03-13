import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssignBookService {
  uri: string = 'http://localhost:3000';
  constructor(
    private http: HttpClient
  ) { }

  assignBookToUser(bookIsbn: string, userId: string, dueDate: any, studentUsername: string): any{
    return this.http.post(`${this.uri}/assignBook`, {isbn: bookIsbn, studentId: userId, dueDate: dueDate, studentUsername: studentUsername});
  }

  getUserAssignedBooks(userId: string): any{
    return this.http.get(`${this.uri}/searchStudentForBooks/${userId}`);
  }
}
