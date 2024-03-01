import { Component, OnInit, ElementRef   } from '@angular/core';
import { Service } from 'src/app/models/service.model';
import { ServiceService } from '../../service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit{
  services?: Service[];
  preview?: string;
  form: FormGroup;

  message: string = '';

  constructor(
    public fb: FormBuilder,
    private serviceService: ServiceService,
    private route: ActivatedRoute,
    private router: Router
) {
  this.form = this.fb.group({
    avatar: [null],
  });
}

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

  deleteService(_id: string): void {
    this.serviceService.delete(_id).subscribe({
      next: (res) => {
        this.message = res.message;
        console.log(res);
        this.router.navigate(['/admin/service']);
      },
      error: (e) => console.error(e)
    });
  }

  formulaireVisibleMap: { [key: string]: boolean } = {}; // Map pour stocker la visibilité du formulaire par ID

  afficherFormulaire(_id: string): void {
    this.formulaireVisibleMap[_id] = true;
  }

  selectedFile: any | undefined;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  saveImage(_id: string): void {
    this.serviceService.updateImg(_id, this.selectedFile).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => console.error(e)
    });
  }

}
