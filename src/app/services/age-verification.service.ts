import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgeVerificationService {
  private apiUrl = 'http://localhost:3000/verify-age';

  constructor(private http: HttpClient) {}

  /**
   * Envoie une image de pièce d'identité pour vérification d'âge.
   * @param idImage - Fichier de la pièce d'identité.
   * @returns Observable avec le résultat de la vérification.
   */
  verifyAge(idImage: File): Observable<any> {
    const formData = new FormData();
    formData.append('idImage', idImage);

    return this.http.post<any>(this.apiUrl, formData);
  }
}
