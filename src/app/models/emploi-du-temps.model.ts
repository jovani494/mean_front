import { Time } from "@angular/common";

export class EmploiDuTempsModel {
    _id?: string; // Identifiant unique de l'emploi du temps (optionnel si vous ne prévoyez pas d'utiliser cet ID côté client)
    employe?: string; // ID de l'employé auquel cet emploi du temps est associé
    matinDebut?: string; // Horaires du matin (début et fin)
    matinFin?: string;
    soirDebut?:  string ; // Horaires du soir (début et fin)
    soirFin?:  string ;
}


