import { Component, OnInit } from '@angular/core';
import { Etat } from 'src/app/models/etat.model';
import { EtatService } from '../etat.service';

@Component({
  selector: 'app-etat-create',
  templateUrl: './etat-create.component.html',
  styleUrls: ['./etat-create.component.css']
})
export class EtatCreateComponent {
  etat: Etat = {
    Nom: '',
    Couleur: ''
  };
  submitted = false;

  constructor(private etatService: EtatService) {}

  saveEtat(): void {
    const data = {
      Nom: this.etat.Nom,
      Couleur: this.etat.Couleur
    };

    this.etatService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }

  newEtat(): void {
    this.submitted = false;
    this.etat = {
      Nom: '',
      Couleur: ''
    };
  }
}
