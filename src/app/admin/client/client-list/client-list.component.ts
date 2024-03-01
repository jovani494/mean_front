import { Component } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { ClientService } from '../client.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent {
  clients?: Client[]
  message?: "";
  constructor (private clientService : ClientService, private router: Router){}

  ngOnInit(): void {
    this.retrieveServices();
  }

  retrieveServices(): void {
    this.clientService.getAll().subscribe({
      next: (client) => {
        this.clients = client;
        console.log(client);
      },
      error: (e) => console.error(e)
    });
  }

  deleteClient(_id: string): void {
    this.clientService.delete(_id).subscribe({
      next: (res) => {
        this.message = res.message;
        console.log(res);
        this.router.navigate(['/admin/client']);
      },
      error: (e) => console.error(e)
    });
  }
}
