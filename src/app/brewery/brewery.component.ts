import { Component, OnInit } from '@angular/core';
import { BreweryService } from '../services/brewery.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { VerifiyAgePopupComponent } from "../verifiy-age-popup/verifiy-age-popup.component";

@Component({
  selector: 'app-brewery',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterLink, VerifiyAgePopupComponent],
  templateUrl: './brewery.component.html',
  styleUrls: ['./brewery.component.scss']
})
export class BreweryComponent implements OnInit {
  breweries: any[] = []; // Stocke les brasseries reçues

  constructor(private breweryService: BreweryService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.breweryService.getBreweries().subscribe((data) => {
      this.breweries = data.map((brewery) => ({
        ...brewery,
        banner_picture_url: this.sanitizer.bypassSecurityTrustUrl(brewery.banner_picture_url),
        profile_picture_url: this.sanitizer.bypassSecurityTrustUrl(brewery.profile_picture_url),
      }));
      console.log(this.breweries);
    });
  
    this.breweryService.fetchBreweries();
  }
}
