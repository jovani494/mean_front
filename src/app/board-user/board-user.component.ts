import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../_services/user.service';
import { StorageService } from '../_services/storage.service';
import { Client } from '../models/client.model';
import { ClientService } from '../admin/client/client.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})

export class BoardUserComponent implements OnInit {
  content?: string;
  client: Client | undefined;
  clientLog : any;
  form: FormGroup;

  message: string = '';

  constructor(public fb: FormBuilder,
            private userService: UserService,
            private clientService : ClientService,
            private storageService: StorageService) {
              this.form = this.fb.group({
                avatar: [null],
              });
             }

  ngOnInit(): void {

    this.gclient()

    this.userService.getUserBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.content = res.message;
          } catch {
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.content = `Error with status: ${err.status}`;
        }
      }
    });
  }

  gclient() : void{
    this.clientLog = this.storageService.getUser();
    const clientId = this.clientLog.id; // Mettez l'ID du client que vous souhaitez récupérer
    this.clientService.getClient(clientId)
      .subscribe(
        (client: Client) => {
          this.client = client;
          console.log('Client:', client);
        },
        (error) => {
          console.error('Erreur lors de la récupération du client:', error);
        }
      );
  }

  formulaireVisible = false;

  afficherFormulaire(): void {
    this.formulaireVisible = true;
  }

  selectedFile: any | undefined;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  saveImage(_id: string): void {
    this.clientService.updateImgCli(_id, this.selectedFile).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => console.error(e)
    });
  }
}
