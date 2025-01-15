import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreweryService } from '../services/brewery.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brewery-details',
  standalone: true,
  imports: [CommonModule, NavbarComponent, MatIconModule],
  templateUrl: './brewery-details.component.html',
  styleUrl: './brewery-details.component.scss'
})
export class BreweryDetailsComponent implements OnInit {
  brewery: any;

  constructor(
    private route: ActivatedRoute,
    private breweryService: BreweryService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.breweryService.getBreweryById(id).subscribe((data) => {
        this.brewery = {
          ...data,
          banner_picture_url: this.sanitizer.bypassSecurityTrustUrl(data.banner_picture_url),
          profile_picture_url: this.sanitizer.bypassSecurityTrustUrl(data.profile_picture_url),
        };
      });
    }
  }

  deleteBrewery(): void {
    if (this.brewery) {
      this.breweryService.deleteBrewery(this.brewery.id).subscribe({
        next: (response) => {
          console.log('Brewery deleted successfully', response);
          // Rediriger l'utilisateur vers la liste des brasseries
          this.router.navigate(['/breweries']);
        },
        error: (error) => {
          console.error('Error deleting brewery', error);
        },
      });
    }
  }
}