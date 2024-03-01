import { Injectable } from '@angular/core';
import { RendezvousModel } from '../models/rendezvous.model';
import { environment } from 'src/environements/environements';
import { HttpHeaders,HttpClient, } from '@angular/common/http';
import { Observable, BehaviorSubject  } from 'rxjs';
import { EmployeModel } from '../models/employe.model';
import { tap } from 'rxjs/operators';

const baseUrl = environment.apiUrl + "/appointment";

@Injectable({
  providedIn: 'root'
})

export class RendezvousService {
  private appointmentsSubject = new BehaviorSubject<RendezvousModel[]>([]);

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {  }  
  iid : any;

  private loadServices(id : string) {
    this.http.get<RendezvousModel[]>(`${baseUrl}/mytasks/${id}`)
    .subscribe(appointments => {
      this.appointmentsSubject.next(appointments);
    });
  }

  getAllAppointments(): Observable<RendezvousModel[]> {
    return this.http.get<RendezvousModel[]>(`${baseUrl}/all`)
  }

  createAppointment(appointmentData: any): Observable<any> {
    return this.http.post(`${baseUrl}/create`, appointmentData);
  }

  updateAppointment(appointmentId: string, Etat: any): Observable<any> {
    return this.http.put(`${baseUrl}/update/${appointmentId}`, Etat).pipe(
      
      tap(() => {
        this.loadServices(this.iid);
      })
    );
  }

  getClientAppointments(clientId: string): Observable<RendezvousModel[]> {
    return this.http.get<RendezvousModel[]>(`${baseUrl}/myappointment/${clientId}`)
  }

  getEmployes(serviceId: string): Observable<EmployeModel[]> {
    return this.http.get<EmployeModel[]>(`${baseUrl}/getemployes/${serviceId}`);
  }

  getEmployeeTasks(employeeId: string): Observable<RendezvousModel[]> {
    this.iid = employeeId;
    this.loadServices(employeeId);
    return this.appointmentsSubject;
  }
  // return this.http.get<RendezvousModel[]>(`${baseUrl}/mytasks/${employeeId}`)
}
