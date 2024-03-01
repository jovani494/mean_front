import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { EmployeModel } from 'src/app/models/employe.model';
import { environment } from 'src/environements/environements';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  private apiUrl = environment.apiUrl + "/employe";
  private employesSubject = new BehaviorSubject<EmployeModel[]>([]);
  private employeSubject = new BehaviorSubject<EmployeModel | null>(null)
  constructor(private http: HttpClient) { }

  loadEmployes(){
    this.http.get<EmployeModel[]>(this.apiUrl)
    .subscribe(clients => {
      this.employesSubject.next(clients);
    });
  }

  getAllEmployes(): Observable<EmployeModel[]> {
    this.loadEmployes();
    return this.employesSubject;
  }

  private loadEmploye(id: any) {
    this.http.get<EmployeModel>(`${this.apiUrl}/get/${id}`)
    .subscribe(employe => {
      this.employeSubject.next(employe);
    });
  }

  getEmploye(id: any): Observable<EmployeModel> {
    return this.http.get<EmployeModel>(`${this.apiUrl}/get/${id}`);
  }

  updateImgEmp(id: any, profileImage: File): Observable<any> {
    var formData: any = new FormData();
    formData.append('avatar', profileImage);
    return this.http.put(`${this.apiUrl}/createimg/${id}`, formData).pipe(
      
      tap(() => {
        this.loadEmploye(id);
      })
    );
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`).pipe(
      tap(() => {
        this.loadEmployes();
      })
    );
  }
}
