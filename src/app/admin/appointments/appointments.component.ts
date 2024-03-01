import { Component, OnInit } from '@angular/core';
import { RendezvousModel } from 'src/app/models/rendezvous.model';
import { RendezvousService } from 'src/app/_services/rendezvous.service';
import { EmployeService } from '../employe/employe.service';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  appointments : RendezvousModel[] = [];
  totalRdvCount: number = 0;
  totalServicePrice: number = 0;
  totalCommission: number = 0;
  rdvCountByEmployee: { [key: string]: number } = {};
  rdvCountByService: { [key: string]: number } = {};

  constructor(private appointmentService : RendezvousService,
              private employeService : EmployeService,
              private serviceService : ServiceService
    ){}

  ngOnInit(): void {
    this.fetchAppointments();
    this.calculateTotals();
  }

  fetchAppointments(): void {
    this.appointmentService.getAllAppointments().subscribe(
      (data : any) => {
        this.appointments = data.rdvs;
        this.totalRdvCount = data.totalRdvCount;
        this.rdvCountByEmployee = data.rdvCountByEmployee;
        this.rdvCountByService = data.rdvCountByService;
      },
      error => {
        console.error('Error fetching appointments:', error);
      }
    );
  }

  calculateTotals(): void {
    this.totalServicePrice = this.appointments.reduce((acc, appointment) => acc + (appointment.Service?.Prix || 0), 0);
    this.totalCommission = this.appointments.reduce((acc, appointment) => acc + (appointment.Service?.CommissionEmploye || 0), 0);
  }

}
