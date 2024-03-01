import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from 'src/app/models/service.model';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-service-create',
  templateUrl: './service-create.component.html',
  styleUrls: ['./service-create.component.css']
})
export class ServiceCreateComponent {
  service: Service = {
    Nom: '',
    Description: '',
    Duree : 0,
    Prix : 0,
    Commission : 0,
    CommissionEmploye : 0
  };
  submitted = false;

  constructor(private serviceService: ServiceService,
    private router: Router) {}

  saveService(): void {
    const data = {
      Nom: this.service.Nom,
      Description: this.service.Description,
      Duree: this.service.Duree,
      Prix: this.service.Prix,
      Commission: this.service.Commission,
      CommissionEmploye: this.service.CommissionEmploye,
    };

    this.serviceService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
        this.router.navigate(['/admin/service']);
      },
      error: (e) => console.error(e)
    });
  }

  newService(): void {
    this.submitted = false;
    this.service = {
      Nom: '',
      Description: '',
      Duree : 0,
      Prix : 0,
      Commission : 0,
      CommissionEmploye : 0,
    };
  }
  
  calculCom(): void {
    // Vérifiez d'abord si les valeurs Prix et Commission sont définies et non nulles
    if (this.service.Prix !== undefined && this.service.Commission !== undefined) {
      // Effectuez le calcul de la commission de l'employé en fonction du prix et de la commission
      this.service.CommissionEmploye = (this.service.Prix * this.service.Commission) / 100;
    }
  }
}
