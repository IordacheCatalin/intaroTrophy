import { Component, Input  } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true, 
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() title: string = 'Card Title';
  @Input() content: string = '/assets/Logo/LogoCup.png';
  @Input() data: string = 'datetime';
}