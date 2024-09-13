import { Component,AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './../../Components/card/card.component';
import { ProgramComponent } from '../program/program.component.';
import { PartnersComponent } from '../partners/partners.component';
import { GalleryComponent } from '../gallery/gallery.component';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardComponent,
    CommonModule,
    ProgramComponent,
    PartnersComponent,
    GalleryComponent,
    ContactComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements AfterViewInit {
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

  ngAfterViewInit() {
    const scrollLeftBtn = document.getElementById('scrollLeftBtn');
    const scrollRightBtn = document.getElementById('scrollRightBtn');
    const cardsContainer = document.getElementById('cardsContainer');

    if (scrollLeftBtn && scrollRightBtn && cardsContainer) {
      scrollLeftBtn.addEventListener('click', () => {
        console.log('Left click'); // Confirm button click
        if (cardsContainer.scrollLeft > 0) {
          cardsContainer.scrollBy({
            left: -200, // Adjust the value based on the card width
            behavior: 'smooth',
          });
        }
      });

      scrollRightBtn.addEventListener('click', () => {
        if (cardsContainer.scrollWidth > cardsContainer.clientWidth) {
          cardsContainer.scrollBy({
            left: 200, // Adjust the value based on the card width
            behavior: 'smooth',
          });
        }
      });
    } else {
      console.error('Elements not found!');
    }
  }
}