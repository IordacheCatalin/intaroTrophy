import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceDetectorService {
  isMobile(): boolean {
    return window.innerWidth <= 768;
  }
}