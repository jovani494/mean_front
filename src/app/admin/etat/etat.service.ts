import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Etat } from 'src/app/models/etat.model';
import { environment } from 'src/environements/environements';

// const baseUrl = 'http://localhost:8080/etat';
const baseUrl = environment.apiUrl + "/etat"

@Injectable({
  providedIn: 'root'
})
export class EtatService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Etat[]> {
    return this.http.get<Etat[]>(baseUrl);
  }

  get(id: any): Observable<Etat> {
    return this.http.get<Etat>(`${baseUrl}/detail/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/create`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/update/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/delete/${id}`);
  }
}
