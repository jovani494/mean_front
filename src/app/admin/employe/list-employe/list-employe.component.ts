import { Component, OnInit } from '@angular/core';
import { EmployeService } from '../employe.service';
import { EmployeModel } from 'src/app/models/employe.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-employe',
  templateUrl: './list-employe.component.html',
  styleUrls: ['./list-employe.component.css']
})
export class ListEmployeComponent {
  employes: EmployeModel[] = [];
  message?: "";

  constructor(private employeService: EmployeService,private route: ActivatedRoute,
    private router: Router){}

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

  deleteEmploye(_id: string): void {
    this.employeService.delete(_id).subscribe({
      next: (res) => {
        this.message = res.message;
        console.log(res);
        this.router.navigate(['/admin/employe']);
      },
      error: (e) => console.error(e)
    });
  }

}
