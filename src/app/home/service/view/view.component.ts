import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from 'src/app/models/service.model';
import { ServiceService } from 'src/app/admin/service.service';
import { ClientService } from 'src/app/admin/client/client.service';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  @Input() currentService: Service = {
    Nom: '',
    Description: '',
    Duree : 0,
    Prix : 0,
    Commission : 0,
    
  };
  userLog : any;
  clientId : any;

  constructor(private serviceService : ServiceService, 
              private storageService : StorageService,
              private clientService : ClientService,
              private route: ActivatedRoute,
              private router: Router){}

  ngOnInit(): void {
      this.getService(this.route.snapshot.params['id']);
      this.userLog = this.storageService.getUser();
      const userId = this.userLog.id;
      this.clientService.getClient(userId).subscribe({
      next: (client) => {
        this.clientId = client._id;
      },
      error: (error) => {
        console.error(error);
      }
    });
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

  formatPrice(price: number | undefined): string {
    if (price === undefined) {
      return "N/A"; // ou tout autre valeur par défaut que vous souhaitez afficher
    }
    return price.toLocaleString('fr-FR');
  }

}
