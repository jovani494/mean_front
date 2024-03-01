import { Component , OnInit } from '@angular/core';
import { EmployeModel } from 'src/app/models/employe.model';
import { EmployeService } from 'src/app/admin/employe/employe.service';

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.css']
})
export class EquipeComponent {
  employes: EmployeModel[] = [];

  constructor(private employeService: EmployeService){}

  ngOnInit(): void {
    this.loadEmployes();
  }

  loadEmployes(): void {
    this.employeService.getAllEmployes().subscribe({
      next: (employes) => {
        this.employes = employes;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}
