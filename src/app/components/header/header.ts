import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-header',
  imports: [Navbar, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  public authService = inject(AuthService);
}