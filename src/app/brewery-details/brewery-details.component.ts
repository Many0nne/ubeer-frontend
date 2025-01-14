import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreweryService } from '../services/brewery.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-brewery-details',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './brewery-details.component.html',
  styleUrl: './brewery-details.component.scss'
})
export class BreweryDetailsComponent implements OnInit {
  brewery: any;

  constructor(
    private route: ActivatedRoute,
    private breweryService: BreweryService,
    private sanitizer: DomSanitizer
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
    console.log(this.brewery)
  }
}