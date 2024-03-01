import { Component } from '@angular/core';
import { Service } from 'src/app/models/service.model';
import { ServiceService } from 'src/app/admin/service.service';
import { StorageService } from 'src/app/_services/storage.service';
import { ClientService } from 'src/app/admin/client/client.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {
  services?: Service[];
  userLog : any;
  clientId : any;
  message = '';
  constructor(private serviceService: ServiceService,
              private storageService : StorageService,
              private clientService : ClientService
    ) {}

  ngOnInit(): void {
    this.retrieveServices();
    this.userLog = this.storageService.getUser();
    const userId = this.userLog.id;
    this.clientService.getClient(userId).subscribe({
      next: (client) => {
        this.clientId = client._id;
      },
      error: (error) => {
        console.error(error);
        if(error.error && error.error.message) {
          this.message = error.error.message; // Assigning the error message to the 'message' variable
        } 
      }
    });

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

  formatPrice(price: number | undefined): string {
    if (price === undefined) {
      return "N/A"; // ou tout autre valeur par défaut que vous souhaitez afficher
    }
    return price.toLocaleString('fr-FR');
  }

}
