import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeerService {
  private apiUrl = 'https://ubeer-backend.onrender.com/beers'
  private apiUrlBr = 'https://ubeer-backend.onrender.com/breweries'

  constructor(private http: HttpClient) { }
  
  getBeers(page: number = 1, limit: number = 10, filters: any = {}): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (filters.name) {
      params = params.set('name', filters.name);
    }
    if (filters.price) {
      params = params.set('price', filters.price);
    }
    if (filters.brewery_id) {
      params = params.set('brewery_id', filters.brewery_id);
    }

    return this.http.get<any>(this.apiUrl, { params });
  }

  addBeer(beer: any): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl, beer);
  }

  getBreweries(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlBr);
  }
}
