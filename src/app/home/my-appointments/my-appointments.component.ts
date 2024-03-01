import { Component, OnInit } from '@angular/core';
import { RendezvousModel } from 'src/app/models/rendezvous.model';
import { StorageService } from 'src/app/_services/storage.service';
import { ClientService } from 'src/app/admin/client/client.service';
import { RendezvousService } from 'src/app/_services/rendezvous.service';

@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.css']
})
export class MyAppointmentsComponent {
  appointments : RendezvousModel[] = [];
  clientLog : any;
  clientId : any;

  constructor(private storageService : StorageService,
              private clientService : ClientService,
              private appointmentService : RendezvousService){}

  ngOnInit() : void{
    this.clientLog = this.storageService.getUser();
    const userId = this.clientLog.id;

    this.clientService.getClient(userId).subscribe({
      next: (employe) => {
        this.clientId = employe._id;
        this.getMyAppointments(this.clientId)
      },
      error: (error) => {
        console.error(error);
      }
    });

  }

  getMyAppointments(id : any) : void{
    this.appointmentService.getClientAppointments(id).subscribe({
      next: (appointments) => {
        this.appointments = appointments;
        console.log(appointments);
      },
      error: (e) => console.error(e)
    });
  };
      
   
}


