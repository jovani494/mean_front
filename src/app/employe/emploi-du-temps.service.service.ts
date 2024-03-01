import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmploiDuTempsModel } from '../models/emploi-du-temps.model';
import { environment } from 'src/environements/environements';

@Injectable({
  providedIn: 'root'
})
export class EmploiDuTempsServiceService {

  private apiUrl = environment.apiUrl + "/edt";

  constructor(private http: HttpClient) { }

  // Méthode pour créer un nouvel emploi du temps
  creerEmploiDuTemps(data: any): Observable<any> {
    return this.http.post(this.apiUrl +"/create", data);
  }

  obtenirEmploiDuTemps(employeId: string): Observable<EmploiDuTempsModel> {
    const url = `${this.apiUrl}/get/${employeId}`;
    return this.http.get<EmploiDuTempsModel>(url);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, data);
  }
}
