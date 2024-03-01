import { Component, OnInit } from '@angular/core';
import { EmploiDuTempsModel } from 'src/app/models/emploi-du-temps.model';
import { EmploiDuTempsServiceService } from '../emploi-du-temps.service.service';
import { StorageService } from 'src/app/_services/storage.service';
import { EmployeService } from 'src/app/admin/employe/employe.service';

@Component({
  selector: 'app-emploi-du-temps',
  templateUrl: './emploi-du-temps.component.html',
  styleUrls: ['./emploi-du-temps.component.css']
})
export class EmploiDuTempsComponent implements OnInit {

  userLog : any;
  emploiDuTemps: EmploiDuTempsModel | undefined;
  employeId: string | undefined;

  constructor(private emploiDuTempsService: EmploiDuTempsServiceService,
            private employeService : EmployeService,
            private storageService : StorageService) { }

  ngOnInit(): void {
    this.userLog = this.storageService.getUser();
    const userId = this.userLog.id;

    this.employeService.getEmploye(userId).subscribe({
      next: (employe) => {
        const employeId = employe._id;
        this.obtenirEmploiDuTemps(employeId);

      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  obtenirEmploiDuTemps(id : any): void {
    this.emploiDuTempsService.obtenirEmploiDuTemps(id)
      .subscribe(
        (data: EmploiDuTempsModel) => {
          this.emploiDuTemps = data;
        },
        error => {
          console.error('Erreur lors de la récupération de l\'emploi du temps:', error);
        }
      );
  }

}
