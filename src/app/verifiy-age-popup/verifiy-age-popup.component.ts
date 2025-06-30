import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verifiy-age-popup',
  imports: [CommonModule],
  templateUrl: './verifiy-age-popup.component.html',
  styleUrl: './verifiy-age-popup.component.scss'
})
export class VerifiyAgePopupComponent {

  showAgePopup: boolean = true;
  confirmAge(isOfAge: boolean): void {
    if (isOfAge) {
      this.setCookie('ageConfirmed', 'true', 30); // Cookie valable 30 jours
      this.showAgePopup = false;
    } else {
      window.location.href = "https://www.google.com";
    }
  }
  setCookie(name: string, value: string, days: number) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
  }
  getCookie(name: string) {
    return document.cookie.split('; ').reduce((r, v) => {
      const parts = v.split('=');
      return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '');
  }
  ngOnInit(): void {
    // Vérifie le cookie à l'initialisation
    if (this.getCookie('ageConfirmed') === 'true') {
      this.showAgePopup = true;
    }
  }

}
