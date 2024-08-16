import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultComponent implements OnInit {
  gamesByDate: { [date: string]: { namePlayer1: string; namePlayer2: string; scorePlayer1: string; scorePlayer2: string; gameHour: string; field: number }[] } = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadPlayerVsPlayers();
  }

  loadPlayerVsPlayers(): void {
    this.http.get<{ [key: string]: any[] }>('/assets/player-vs-player.json').subscribe(data => {
      this.gamesByDate = data; // Store the grouped data by date
    });
  }
}
