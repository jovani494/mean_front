export class RendezvousModel {
    _id?: any;
  DateRdv?: string;
  Heure?: string;
  Client?: any; // L'ID du client (assurez-vous d'utiliser le bon type ici)
  Service?: any; // L'ID du service
  Employe?: any; // L'ID de l'employé
  Etat?: any; // L'ID de l'état
  created_at?: Date;
  totalServicePrice?: number; // Ajouter cette propriété
  totalEmployeeCommission?: number; // Ajouter cette propriété
}
