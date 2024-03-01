import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient, } from '@angular/common/http';
import { Observable, BehaviorSubject  } from 'rxjs';
import {Client} from '../../models/client.model';
import { environment } from 'src/environements/environements';
import { tap } from 'rxjs/operators';

// const baseUrl = 'http://localhost:8080/client';
const baseUrl = environment.apiUrl+ "/client";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private ClientsSubject = new BehaviorSubject<Client[]>([]);
  private clientSubject = new BehaviorSubject<Client | null>(null)
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { this.loadClients(); }

  private loadClients() {
    this.http.get<Client[]>(baseUrl)
    .subscribe(clients => {
      this.ClientsSubject.next(clients);
    });
  }

  private loadClient(id: any) {
    this.http.get<Client>(`${baseUrl}/get/${id}`)
    .subscribe(client => {
      this.clientSubject.next(client);
    });
  }

  getAll(): Observable<Client[]> {
    this.loadClients();
    return this.ClientsSubject;
  }

  get(id: any): Observable<Client> {
    return this.http.get<Client>(`${baseUrl}/detail/${id}`);
  }

  getClient(id: any): Observable<Client> {
    return this.http.get<Client>(`${baseUrl}/get/${id}`);
  }

  updateImgCli(id: any, profileImage: File): Observable<any> {
    var formData: any = new FormData();
    formData.append('avatar', profileImage);
    return this.http.put(`${baseUrl}/createimg/${id}`, formData).pipe(
      tap(() => {
        this.loadClient(id);
      })
    );
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/delete/${id}`).pipe(
      tap(() => {
        this.loadClients();
      })
    );
  }

}
