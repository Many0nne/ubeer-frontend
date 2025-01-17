import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { BreweryService } from '../services/brewery.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [NavbarComponent, CommonModule, RouterLink],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
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
