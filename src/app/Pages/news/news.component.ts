import {
  Component,
  OnInit,
  Renderer2
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  tableData: any[] = [];
  newsData: any[] = [];
  isActive: boolean[] = [];
  isNotActive: boolean[] = [];
  showBigNews: boolean = true;

  isActiveTableplayers: boolean = false;
  isActiveAboutUs: boolean = false;

  constructor(private http: HttpClient, private renderer: Renderer2) { }
  ngOnInit(): void {
    this.loadTableData().subscribe((data) => {
      this.tableData = data;
    });

    this.loadNewsData().subscribe((res) => {
      this.newsData = res;
    });


  }

  loadTableData(): Observable<any[]> {
    return this.http.get<any[]>('assets/playersDetails.json');
  }

  loadNewsData(): Observable<any[]> {
    return this.http.get<any[]>('assets/NewsPost.json');
  }

  addClass(index: number): void {
    const elements = document.querySelectorAll('.news-box-container');
    elements.forEach((element) => {
      this.renderer.removeClass(element, 'not-active');
    });
    this.isActive[index] = true;
    this.showBigNews = false;
  }

  removeClass(index: number): void {
    const elements = document.querySelectorAll('.news-box-container');
    elements.forEach((element) => {
      this.renderer.removeClass(element, 'not-active');
    });
    this.isActive[index] = false;
    this.showBigNews = true;
  }

  addClassToAboutUs(str: string): void {
    if (str === "about-us") {
      this.isActiveAboutUs = true;
    }
    if (str === "table-playesrs") { this.isActiveTableplayers = true; }
  }

  removeClassToAboutUs(str: string): void {
    if (str === "about-us") {
      this.isActiveAboutUs = false;
    }
    if (str === "table-playesrs") {
      this.isActiveTableplayers = false;
    }
  }

  getImagePath(country: string): string {
    switch (country) {
      case 'Romania':
        return 'assets/Logo/Romania.jpg';
      case 'Bulgaria':
        return 'assets/Logo/Bulgaria.jpg';
      case 'Italy':
        return 'assets/Logo/Italy.jpg';
      case '':
        return 'assets/Logo/FlagLogo.png';
      case 'Netherlands':
        return 'assets/Logo/Netherlands.jpg';
      case 'Ukraine':
        return 'assets/Logo/Ukraine.jpg';
      case 'France':
        return 'assets/Logo/France.jpg';
      case 'Brazil':
        return 'assets/Logo/Brazil.jpg';
      case 'Hungary':
        return 'assets/Logo/Hungary.jpg';
      case 'Denmark':
        return 'assets/Logo/Denmark.jpg';
      case 'Czech Republic':
        return 'assets/Logo/CzechRepublic.jpg';
      case 'Poland':
        return 'assets/Logo/Poland.jpg';
      case 'Argentina':
        return 'assets/Logo/Argentina.jpg';
      case 'Austria':
        return 'assets/Logo/Austria.jpg';
      case 'Slovakia':
        return 'assets/Logo/Slovakia.jpg';
      case 'Japan':
        return 'assets/Logo/Japan.jpg';
      case 'Canada':
        return 'assets/Logo/Canada.jpg';
      case 'Israel':
        return 'assets/Logo/Israel.jpg';
      case 'Spain':
        return 'assets/Logo/Spania.jpg';

      default:
        return 'assets/Logos/FlagLogo.png'; // Path to a default flag or image
    }
  }
}
