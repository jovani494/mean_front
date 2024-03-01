import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { StorageService } from '../../_services/storage.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeModel } from '../../models/employe.model';
import { EmployeService } from '../../admin/employe/employe.service';

@Component({
  selector: 'app-profile-emp',
  templateUrl: './profileEmp.component.html',
  styleUrls: ['./profileEmp.component.css']
})
export class ProfileEmpComponent implements OnInit {
  employe: EmployeModel | undefined;
  employeLog : any;
  preview?: string;
  form: FormGroup;

  constructor(public fb: FormBuilder,
    private userService: UserService,
    private employeService : EmployeService,
    private storageService: StorageService) {
      this.form = this.fb.group({
        avatar: [null],
      });
     }

  ngOnInit() : void {
    this.gEmp();
  }

  gEmp() : void{
    this.employeLog = this.storageService.getUser();
    const employeId = this.employeLog.id; 
    this.employeService.getEmploye(employeId)
      .subscribe(
        (employe: EmployeModel) => {
          this.employe = employe;
          console.log('Employe:', employe);
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
    this.employeService.updateImgEmp(_id, this.selectedFile).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => console.error(e)
    });
  }

}
