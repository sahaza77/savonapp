import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../../services/utilisateur-service';

@Component({
  selector: 'app-users-manager-page',
  templateUrl: './users-manager-page.html',
})
export class UsersManagerPage implements OnInit {

  public users: any[] = [];

  constructor(private userService: UtilisateurService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (data: any) => {
        this.users = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}