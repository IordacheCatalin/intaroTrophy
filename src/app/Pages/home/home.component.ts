import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './../../Components/card/card.component';
import { ProgramComponent } from '../program/program.component.';
import { PartnersComponent } from '../partners/partners.component';
import { GalleryComponent } from '../gallery/gallery.component';
import {ContactComponent} from '../contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, CommonModule, ProgramComponent, PartnersComponent, GalleryComponent, ContactComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  cards = [
    {
      title: 'Evenimentul de lansare',
      content: '/assets/Images/card1.png',
      data: '12.07.2024',
    },
    {
      title: 'Înscrieri concurenți',
      content: '/assets/Images/card2.png',
      data: '12.07.2024',
    },
    {
      title: 'Programul turneului',
      content: '/assets/Images/card2.png',
      data: '12.07.2024',
    },
  ];
}
