import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient, } from '@angular/common/http';
import { Observable, BehaviorSubject  } from 'rxjs';
import { Service } from '../models/service.model';
import { tap } from 'rxjs/operators'; // Importer tap depuis RxJS
import { environment } from 'src/environements/environements';

// const baseUrl = 'http://localhost:8080/service';
const baseUrl = environment.apiUrl + "/service";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private servicesSubject = new BehaviorSubject<Service[]>([]);

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { this.loadServices(); }

  private loadServices() {
    this.http.get<Service[]>(baseUrl)
    .subscribe(services => {
      this.servicesSubject.next(services);
    });
  }

  getAll(): Observable<Service[]> {
    this.loadServices();
    return this.servicesSubject;
  }

  get(id: any): Observable<Service> {
    return this.http.get<Service>(`${baseUrl}/detail/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/create`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/update/${id}`, data);
  }

  updateImg(id: any, profileImage: File): Observable<any> {
    var formData: any = new FormData();
    formData.append('avatar', profileImage);
    return this.http.put(`${baseUrl}/createimg/${id}`, formData).pipe(
      
      tap(() => {
        this.loadServices();
      })
    );
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/delete/${id}`).pipe(
      // Mettre à jour la liste après la suppression
      tap(() => {
        this.loadServices();
      })
    );
  }
}
