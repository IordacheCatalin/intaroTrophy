import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-program',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css'],
})
export class ProgramComponent {
  days: { title: string; date: string; isCurrent: boolean }[] = [];
  
  playerVsPlayers: {
    namePlayer1: string;
    namePlayer2: string;
    scorePlayer1: string;
    scorePlayer2: string;
    gameHour: string;
    field: number;
  }[] = [];


  constructor(private http: HttpClient) {
    this.generateDays();
    this.loadPlayerVsPlayers();
  }

  generateDays(): void {
    const dayNames = ['Du', 'Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sâ'];
    const currentDate = new Date();
    const today = currentDate.getDate();

    for (let i = 0; i < 7; i++) {
      const futureDate = new Date(currentDate);
      futureDate.setDate(currentDate.getDate() + i);

      const dayName = dayNames[futureDate.getDay()];
      const formattedDate = futureDate
        .toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
        })
        .replace(/\//g, '.');

      this.days.push({
        title: dayName,
        date: formattedDate,
        isCurrent: futureDate.getDate() === today,
      });
    }
  }

  loadPlayerVsPlayers(): void {
    const currentDate = new Date();
    const formattedDate = currentDate
      .toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
      })
      .replace(/\//g, '.');

    this.http.get<{[key: string]: any[]}>('/assets/player-vs-player.json').subscribe(data => {
      if (data[formattedDate]) {
        this.playerVsPlayers = data[formattedDate];
      } else {
        const firstDateKey = Object.keys(data)[1];
        this.playerVsPlayers = data[firstDateKey] || [];
      }
    });
  }
}
