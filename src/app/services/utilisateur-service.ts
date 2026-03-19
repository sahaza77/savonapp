import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private API_URL = "http://localhost:8080/users";

  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get(this.API_URL);
  }
}