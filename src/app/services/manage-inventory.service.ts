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
}
