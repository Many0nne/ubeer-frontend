import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BeerService } from '../services/beer.service';
import { BreweryService } from '../services/brewery.service';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-beer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './beer.component.html',
  styleUrls: ['./beer.component.scss']
})
export class BeerComponent implements OnInit {
  beers: any[] = [];
  filteredBeers: any[] = [];
  breweries: any[] = [];
  beerForm: FormGroup;
  currentPage: number = 1;
  totalPages: number = 1;
  limit: number = 10;

  constructor(private beerService: BeerService, private fb: FormBuilder, private breweryService: BreweryService) {
    this.beerForm = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
      brewery_id: ['']
    });
  }

  ngOnInit(): void {
    this.beerService.getBreweries().subscribe(data => {
      this.breweries = data;
      console.log('Breweries:', this.breweries); // Vérifiez les données dans la console
    }, error => {
      console.error('Error fetching breweries:', error); // Vérifiez les erreurs dans la console
    });

    this.loadBeers();

    // Demander explicitement les brasseries
    this.breweryService.fetchBreweries();
  }

  loadBeers(): void {
    this.beerService.getBeers(this.currentPage, this.limit).subscribe(response => {
      this.beers = response.data;
      this.filteredBeers = this.beers;
      this.totalPages = response.pagination.total_pages;
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
        this.loadBeers();
        this.beerForm.reset();
      }, error => {
        console.error('Error adding beer:', error);
      });
    }
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadBeers();
    }
  }

  changeLimit(limit: number): void {
    this.limit = limit;
    this.currentPage = 1;
    this.loadBeers();
  }
}