export class EmployeModel {
    _id?: any;
    Nom?: string;
    Prenom?: string;
    Phone?: number;
    Gender?: string;
    avatar?: string;
    Services?: service;
}

export class service{
_id?: string; // Identifiant unique du service
  Nom?: string;
}
