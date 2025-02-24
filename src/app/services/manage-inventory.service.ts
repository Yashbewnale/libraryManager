import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManageInventoryService {

  URI = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  uploadBooks(formData:any){
    return this.http.post(`${this.URI}/uploadBooks`, formData);
  };

  getBooks(page: number, size: number){
        let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', size.toString());

    return this.http.get(`${this.URI}/getBooks`, { params });
  }

  getAssignedBooks(){
    return this.http.get(`${this.URI}/assignedBooks`);
  }

  returnBook(isbn: string, studentId: string){
    return this.http.post(`${this.URI}/returnBook`, {isbn: isbn, studentId: studentId});
  }

  searchBook(searchText: string){
    return this.http.get(`${this.URI}/searchBook`, { params: {isbn: searchText}});
  }

  searchAssignedBook(searchText: string){
    return this.http.get(`${this.URI}/searchAssignedBook`, { params: {isbn: searchText}});
  }

  deleteBook(isbn: string){
    return this.http.delete(`${this.URI}/deleteBook`, { params: {isbn: isbn}});
  }

}
