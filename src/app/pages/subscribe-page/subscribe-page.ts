import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscribe-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './subscribe-page.html',
  styleUrl: './subscribe-page.css',
})
export class SubscribePage {

  // Modèle du formulaire
  public user = {
    username: '',
    email: '',
    password: ''
  };

  // Messages
  public errorMessage: string | null = null;
  public successMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit(): void {
    this.errorMessage = null;
    this.successMessage = null;

    this.authService.register(this.user).subscribe({
      next: () => {
        this.successMessage = "Compte créé avec succès !";
        this.router.navigate(['/login']); // redirection
      },
      error: (err) => {
        this.errorMessage = "Erreur lors de l'inscription.";
        console.error(err);
      }
    });
  }
}