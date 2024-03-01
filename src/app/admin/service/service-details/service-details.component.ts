import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from 'src/app/models/service.model';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent {
  @Input() viewMode = false;

  @Input() currentService: Service = {
    Nom: '',
    Description: '',
    Duree : 0,
    Prix : 0,
    Commission : 0,
    
  };

  message = '';

  constructor(private serviceService: ServiceService,private route: ActivatedRoute,private router: Router) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getService(this.route.snapshot.params['id']);
    }
  }

  getService(id: string): void {
    this.serviceService.get(id).subscribe({
      next: (data) => {
        this.currentService = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }


  deleteService(): void {
    this.serviceService.delete(this.currentService._id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/admin/service']);
      },
      error: (e) => console.error(e)
    });
  }
}
