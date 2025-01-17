import { Component } from '@angular/core';
import { BeerService } from '../services/beer.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BreweryService } from '../services/brewery.service';



@Component({
  selector: 'app-beer',
  standalone: true,
  imports: [CommonModule, NavbarComponent, MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './beer.component.html',
  styleUrl: './beer.component.scss'
})
export class BeerComponent {
  beers: any[] = [];
  filteredBeers: any[] = [];
  breweries: any[] = [];
  beerForm: FormGroup;

  constructor(private beerService: BeerService, private fb: FormBuilder, private BreweryService: BreweryService) {
    this.beerForm = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
      brewery_id: ['']
    })
  }

  ngOnInit(): void {
    this.beerService.getBeers().subscribe(data => {
      this.beers = data;
      this.filteredBeers = data;
      console.log('Beers:', this.beers); // Ajoutez ce console.log pour vérifier les données
    }, error => {
      console.error('Error fetching beers:', error); // Ajoutez ce console.log pour vérifier les erreurs
    });

    this.BreweryService.getBreweries().subscribe(data => {
      this.breweries = data;
      console.log('Breweries:', this.breweries); // Vérifiez les données dans la console
    }, error => {
      console.error('Error fetching breweries:', error); // Vérifiez les erreurs dans la console
    });


  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement.value.toLowerCase();
    this.filteredBeers = this.beers.filter(beer => beer.name.toLowerCase().includes(query));
  }

  onSubmit(): void {
    if (this.beerForm.valid) {
      console.log('Form Data:', this.beerForm.value); // Ajoutez ce log pour vérifier les données
      this.beerService.addBeer(this.beerForm.value).subscribe(newBeer => {
        this.beers.push(newBeer);
        this.filteredBeers.push(newBeer);
        this.beerForm.reset();
      }, error => {
        console.error('Error adding beer:', error);
      });
    }
  }

}
