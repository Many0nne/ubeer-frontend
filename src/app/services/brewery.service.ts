import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreweryService {
  private socket: Socket;

  constructor() {
    // Corrigez l'URL du serveur Socket.IO (doit correspondre au port de votre backend)
    this.socket = io('https://ubeer-backend.onrender.com/'); // Port correct
  }

  // Méthode pour écouter les brasseries via le socket
  getBreweries(): Observable<any[]> {
    return new Observable((subscriber) => {
      // Écoute de l'événement "breweries"
      this.socket.on('breweries', (data) => {
        subscriber.next(data); // Envoie des données au composant
      });

      // Nettoyage : désabonnement pour éviter des fuites mémoire
      return () => {
        this.socket.off('breweries');
      };
    });
  }

  // Méthode pour demander des brasseries explicitement
  fetchBreweries(): void {
    this.socket.emit('getBreweries'); // Émission d'une requête au serveur
  }

  // Méthode pour obtenir les détails d'une brasserie par son ID
  getBreweryById(id: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.emit('getBreweryById', id); // Emission d'un événement au serveur pour récupérer les détails
      this.socket.on('breweryDetails', (data) => {
        subscriber.next(data); // Retourne les détails reçus
      });

      return () => {
        this.socket.off('breweryDetails');
      };
    });
  }

  deleteBrewery(id: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.emit('deleteBrewery', id); // Emission d'un événement pour supprimer la brasserie
      this.socket.on('breweryDeleted', (data) => {
        subscriber.next(data); // Retourne la réponse du serveur
      });

      return () => {
        this.socket.off('breweryDeleted');
      };
    });
  }
}
