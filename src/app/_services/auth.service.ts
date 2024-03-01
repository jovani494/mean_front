import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environements/environements';

// const AUTH_API = 'http://localhost:8080/api/auth/';
const AUTH_API = environment.apiUrl + '/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(username: string, email: string, password: string, 
    Nom: String, Prenom: String, Gender : String, Phone: Number): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',   
      {
        username,
        email,
        password,
        Nom,
        Prenom,
        Gender,
        Phone
      },
      httpOptions
    );
  }

  addEmp(username: string, email: string, password: string, 
    Nom: String, Prenom: String, Gender : String, Phone: Number,  Services : string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',   
      {
        username,
        email,
        password,
        Nom,
        Prenom,
        Gender,
        Phone,
        Services,
        
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }
}
