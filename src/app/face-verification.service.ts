import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development'

@Injectable({
  providedIn: 'root'
})
export class FaceVerificationService {
  private apiUrl = 'https://faceanalyzer-ai.p.rapidapi.com/faceanalysis';
  private rapidApiKey = environment.rapidApiKey;

  constructor(private http: HttpClient) {}

  verifyAge(imageUrl: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-rapidapi-host': 'faceanalyzer-ai.p.rapidapi.com',
      'x-rapidapi-key': this.rapidApiKey
    });

    const body = new URLSearchParams();
    body.set('url', imageUrl);

    return this.http.post(this.apiUrl, body.toString(), { headers });
  }
}