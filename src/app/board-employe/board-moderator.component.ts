import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { StorageService } from '../_services/storage.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeModel } from '../models/employe.model';
import { EmployeService } from '../admin/employe/employe.service';

@Component({
  selector: 'app-board-moderator',
  templateUrl: './board-moderator.component.html',
  styleUrls: ['./board-moderator.component.css']
})
export class BoardEmployeComponent implements OnInit {
  content?: string;
  isLoggedIn = false;
  showModeratorBoard = false;
  private roles: string[] = [];

  constructor(public fb: FormBuilder,
    private userService: UserService,
    private storageService: StorageService) {
     }

  ngOnInit(): void {

    this.userService.getModeratorBoard().subscribe({
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

    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

    }
  }


}
