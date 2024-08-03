import { Component,HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceDetectorService } from '../../Services/mobileDetector.service';
import {FooterComponentMobile} from './footerMobile/footerMobile.component'
@Component({
  selector: 'app-footer',
  standalone: true,
  imports:[FooterComponentMobile,CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  isMobile: boolean;

  constructor(private deviceDetector: DeviceDetectorService) {
    this.isMobile = this.deviceDetector.isMobile();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    const width = (event.target as Window).innerWidth;
    if (width < 767) {
      window.location.reload();
    }
    if (width > 768) {
      window.location.reload();
    }
  }
}