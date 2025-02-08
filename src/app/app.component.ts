import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../app/Components/navbar/navbar.component';
import { FooterComponent } from './Components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'intaroTrophy';
  isNavBarVisible: boolean = false;

  private hideComponentsRoutes = ['/'];

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const cleanUrl = this.router.url.split('?')[0].split('#')[0]; // Remove query parameters and fragments
        this.isNavBarVisible = !this.hideComponentsRoutes.includes(cleanUrl);
      }
    });
  }
}
