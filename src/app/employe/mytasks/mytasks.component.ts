import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EmployeService } from 'src/app/admin/employe/employe.service';
import { StorageService } from '../../_services/storage.service';
import { RendezvousModel } from 'src/app/models/rendezvous.model';
import { RendezvousService } from 'src/app/_services/rendezvous.service';
import { EtatService } from 'src/app/admin/etat/etat.service';
import { Etat } from 'src/app/models/etat.model';

@Component({
  selector: 'app-mytasks',
  templateUrl: './mytasks.component.html',
  styleUrls: ['./mytasks.component.css']
})
export class MytasksComponent implements OnInit {
  appointments : RendezvousModel[] = [];
  etats : Etat[] = []
  userLog : any;
  employeId : any;
  successMessage? : "" ;
  errorMessage?: "";
  test1?: "";
  test2?: "";
  totalCommission: number = 0;

  currentRdv: RendezvousModel = {
    Etat : ''
  };


  constructor(private appointmentService : RendezvousService, 
            private etatService : EtatService,
            private employeService : EmployeService, 
            private storageService : StorageService){}

  ngOnInit(): void {
    this.retrieveTasks();
    this.retrieveEtats();
  }

  retrieveTasks(): void {
    this.userLog = this.storageService.getUser();
    const usereId = this.userLog.id;

    this.employeService.getEmploye(usereId).subscribe({
      next: (employe) => {
        this.employeId = employe._id;

        this.appointmentService.getEmployeeTasks(this.employeId).subscribe({
          next: (appointments) => {
            this.appointments = appointments;
            console.log(appointments);
          },
          error: (e) => console.error(e)
        });
        
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  retrieveEtats(): void {
    this.etatService.getAll().subscribe({
      next: (etats) => {
            this.etats = etats;
            console.log(etats);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  onChangeEtat( id : string , event: any,){
    const selectedValue = event.target.value;
    console.log("Valeur sélectionnée :", selectedValue, id);

    const data = {
      Etat : selectedValue
    };

    this.updateAppointmentState(id, data);
  }

  updateAppointmentState(appointmentId: string, Etat: any): void {
    this.appointmentService.updateAppointment(appointmentId, Etat)
      .subscribe(
        response => {
          this.successMessage = response.message;
          this.test1 = response.test1;
          this.test2 = response.test2;
        },
        error => {
          this.errorMessage = error.error.message; 
          // Gérer l'erreur si nécessaire
        }
      );
  }

  calculateTotals(): void {
    this.totalCommission = this.appointments.reduce((acc, appointment) => acc + (appointment.Service?.CommissionEmploye || 0), 0);
  }

}
