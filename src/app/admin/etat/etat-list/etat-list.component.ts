import { Component, OnInit } from '@angular/core';
import { Etat } from 'src/app/models/etat.model';
import { EtatService } from '../etat.service';

@Component({
  selector: 'app-etat-list',
  templateUrl: './etat-list.component.html',
  styleUrls: ['./etat-list.component.css']
})
export class EtatListComponent implements OnInit {
  etats?: Etat[];

  constructor(private etatService: EtatService) {}

  ngOnInit(): void {
    this.retrieveEtats();
  }

  retrieveEtats(): void {
    this.etatService.getAll().subscribe({
      next: (etat) => {
        this.etats = etat;
        console.log(etat);
      },
      error: (e) => console.error(e)
    });
  }

  deleteEtat(_id: string): void {
    this.etatService.delete(_id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => console.error(e)
    });
  }
}
