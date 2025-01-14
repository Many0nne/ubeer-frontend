import { Component } from '@angular/core';
import { BeerService } from '../services/beer.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-beer',
  standalone: true,
  imports: [CommonModule, NavbarComponent, MatCardModule, MatFormFieldModule, MatInputModule],
  templateUrl: './beer.component.html',
  styleUrl: './beer.component.scss'
})
export class BeerComponent {
  beers: any[] = [];
  filteredBeers: any[] = [];

  constructor(private beerService: BeerService) { }

  ngOnInit(): void {
    this.beerService.getBeers().subscribe(data => {
      this.beers = data;
      this.filteredBeers = data;
      console.log('Beers:', this.beers); // Ajoutez ce console.log pour vérifier les données
    }, error => {
      console.error('Error fetching beers:', error); // Ajoutez ce console.log pour vérifier les erreurs
    });
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement.value.toLowerCase();
    this.filteredBeers = this.beers.filter(beer => beer.name.toLowerCase().includes(query));
  }

}
