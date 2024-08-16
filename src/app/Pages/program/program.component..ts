import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-program',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css'],
})
export class ProgramComponent implements OnInit {
  days: { title: string; date: string; isCurrent: boolean }[] = [];
  playerVsPlayers: {
    namePlayer1: string;
    namePlayer2: string;
    scorePlayer1: string;
    scorePlayer2: string;
    gameHour: string;
    field: number;
  }[] = [];
  visibleDays: number = 37; // 7 days behind + 30 days ahead
  selectedDate: string | null = null;

  @ViewChild('daysContainer') daysContainer!: ElementRef;

  constructor(
    private http: HttpClient,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.visibleDays = result.matches ? 20 : 30; // Adjust the number of days to show based on screen size
        this.generateDays();
        this.selectedDate = this.getFormattedDate(new Date()); // Set current day as selected
        this.loadPlayerVsPlayers();
      });
  }

  ngAfterViewInit() {

    setTimeout(() => {
      const currentDayElement = this.daysContainer.nativeElement.querySelector('.current');
      if (currentDayElement) {
        const daysContainerElement = this.daysContainer.nativeElement;
        const offset = currentDayElement.offsetLeft - (daysContainerElement.clientWidth / 2) + (currentDayElement.clientWidth / 2);
        daysContainerElement.scrollTo({ left: offset, behavior: 'smooth' });
      }
    }, 100); 

    const scrollLeftBtn = document.getElementById('scrollLeftBtn2');
    const scrollRightBtn = document.getElementById('scrollRightBtn2');
    const cardsContainer = document.getElementById('daysContainer');

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
        console.log('Right click'); // Confirm button click
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

  generateDays(): void {
    const dayNames = ['Du', 'Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sâ'];
    const currentDate = new Date();
    const today = this.getFormattedDate(currentDate);

    this.days = []; // Reset the days array

    // Add 7 days before the current date
    for (let i = 7; i > 0; i--) {
      const pastDate = new Date(currentDate);
      pastDate.setDate(currentDate.getDate() - i);

      const dayName = dayNames[pastDate.getDay()];
      const formattedDate = this.getFormattedDate(pastDate);

      this.days.push({
        title: dayName,
        date: formattedDate,
        isCurrent: formattedDate === today,
      });
    }

    // Add the current date and 30 days after it
    for (let i = 0; i <= 30; i++) {
      const futureDate = new Date(currentDate);
      futureDate.setDate(currentDate.getDate() + i);

      const dayName = dayNames[futureDate.getDay()];
      const formattedDate = this.getFormattedDate(futureDate);

      this.days.push({
        title: dayName,
        date: formattedDate,
        isCurrent: formattedDate === today,
      });
    }
  }

  getFormattedDate(date: Date): string {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
    }).replace(/\//g, '.');
  }

  loadPlayerVsPlayers(date?: string): void {
    const currentDate = date || this.getFormattedDate(new Date());

    this.http.get<{ [key: string]: any[] }>('/assets/player-vs-player.json').subscribe(data => {
      if (data[currentDate]) {
        this.playerVsPlayers = data[currentDate];
      } else {
        const firstDateKey = Object.keys(data)[0];
        this.playerVsPlayers = data[firstDateKey] || [];
      }
    });
  }

  selectDay(day: { title: string; date: string; isCurrent: boolean }): void {
    this.selectedDate = day.date;
    this.loadPlayerVsPlayers(this.selectedDate);
  }
}
