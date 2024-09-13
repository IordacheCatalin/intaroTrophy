import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { debug } from 'node:console';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  router = inject(Router);
  document = inject(DOCUMENT);
  ngOnInit() {}

  handleLinkClick(id: string) {
    this.scrollToElement(id);
    this.collapseNavMenu();
  }

  collapseNavMenu() {
    const navbarCollapse = this.document.querySelector('.navbar-collapse');
    const navbarToggler = this.document.querySelector('.navbar-toggler');

    if (navbarCollapse?.classList.contains('show')) {
      navbarToggler?.classList.add('collapsed');
      navbarCollapse?.classList.remove('show');
    }
  }

  scrollToElement(id: string) {
    const element = document.getElementById(`${id}`);
  
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      this.router.navigate(['/home']).then(() => {
        setTimeout(() => {
          const elementAfterNavigation = document.getElementById(`${id}`);
          if (elementAfterNavigation) {
            elementAfterNavigation.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 500);
      });
    }
  }
}
