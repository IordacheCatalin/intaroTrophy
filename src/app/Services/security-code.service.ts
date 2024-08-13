import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SecurityCodeService {

  generateSecurityCode(length: number = 4): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  }
}