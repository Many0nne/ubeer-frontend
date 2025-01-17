import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeerService {
  private apiUrl = 'https://ubeer-backend.onrender.com/beers'
  private apiUrlBr = 'https://ubeer-backend.onrender.com/breweries'

  constructor(private http: HttpClient) { }
  
  getBeers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addBeer(beer: any): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl, beer);
  }

  getBreweries(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlBr);
  }
}
