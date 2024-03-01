import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { ServiceService } from '../../service.service';
import { Service } from 'src/app/models/service.model';

@Component({
  selector: 'app-create-employe',
  templateUrl: './create-employe.component.html',
  styleUrls: ['./create-employe.component.css']
})
export class CreateEmployeComponent {
  services?: Service[];
  form: any = {
    username: null,
    email: null,
    password: null,
    Nom: null,
    Prenom : null,
    Gender : null,
    Phone : null,
    Services : null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private serviceService: ServiceService){}

  ngOnInit(): void {
    this.retrieveServices();
  }

  retrieveServices(): void {
    this.serviceService.getAll().subscribe({
      next: (service) => {
        this.services = service;
        console.log(service);
      },
      error: (e) => console.error(e)
    });
  }

  onSubmit(): void {
    const { username, email, password, Nom, Prenom, Gender, Phone, Services } = this.form;

    this.authService.addEmp(username, email, password,
      Nom,Prenom,Gender,Phone, Services).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}
