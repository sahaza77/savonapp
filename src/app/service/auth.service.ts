import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API_URL = 'http://localhost:8080/auth';
  private readonly TOKEN_KEY = 'savapp_jwt_token';
  private router = inject(Router); // ajouter l'injection du Router

  // Signal pour suivre l'état de la connexion :
//public isAuthenticated = signal<boolean>(this.hasToken()); // A COMMENTER
  

  constructor(private http: HttpClient) { }

  login(credential: any): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, credential).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem(this.TOKEN_KEY, response.token);
          //this.isAuthenticated.set(true); // A COMMENTER
        }
      })
    );
  }
  register(user: any): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, user);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    //this.isAuthenticated.set(false); // A COMMENTER
    this.router.navigate(['/login']); //Ajouter le redirection
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Méthode pour vérifier si l'utilisateur est authentifié :
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Méthode pour décoder le token JWT et extraire les informations utilisateur :
  private getDecodedToken(): any {
    const token = this.getToken();

    if (!token) return null;

    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (e) {
      return null;
    }
  }

  // Méthode pour obtenir l'identifiant de l'utilisateur à partir du token :
  getUserIdentifier(): string {
    const decoded = this.getDecodedToken();
    return decoded ? decoded.sub : 'Invité';
  }

  // Méthode pour vérifier si l'utilisateur a un rôle spécifique :
  hasRole(role: string): boolean {
    const decoded = this.getDecodedToken();

    if (!decoded || !decoded.role) return false;

    return decoded.role.includes(role);
  }

  // Méthode pour obtenir les informations complètes de l'utilisateur à partir du token :
  getUserFullInfo() {
    const decoded = this.getDecodedToken();

    if (!decoded) return null;

    return {
      username: decoded.sub,
      role: decoded.roles || [],
      expiration: new Date(decoded.exp * 1000)
    };
  }
}