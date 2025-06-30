import { Component, Inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { FaceVerificationService } from '../face-verification.service';
import { environment } from '../../environments/environment.development'; // Assurez-vous que le chemin est correct
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  showModal = false;

  // Remplace par tes infos Cloudinary
  private cloudName = environment.cloudName || '';
  private uploadPreset = environment.uploadPreset || '';

  constructor(
    @Inject(DOCUMENT) public document: Document, 
    public auth: AuthService,
    private faceVerification: FaceVerificationService,
    private http: HttpClient
  ) {}

  async handleImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      try {
        const imageUrl = await this.uploadToCloudinary(file);
        
        this.showModal = false;
        
        await this.verifyAge(imageUrl);
      } catch (error) {
        console.error('Upload failed:', error);
        alert('Erreur lors de l\'upload de l\'image');
      }
    }
  }

  private async uploadToCloudinary(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${this.cloudName}/upload`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Échec de l\'upload Cloudinary');
    }

    const data = await response.json();
    return data.secure_url;  // URL publique HTTPS de l'image uploadée
  }

  async verifyAge(imageUrl: string) {
    console.log("On affiche bien le front")
    try {
      this.faceVerification.verifyAge(imageUrl).subscribe({
        next: (response) => {
          if (!response.body?.faces || response.body.faces.length === 0) {
            alert('Aucun visage détecté. Veuillez prendre une photo plus claire.');
            return;
          }

          const face = response.body.faces[0];
          const ageRange = face.facialFeatures.AgeRange;
          
          const averageAge = (ageRange.Low + ageRange.High) / 2;
          
          const estimatedAge = Math.round(averageAge);

          console.log(`Âge estimé: ${estimatedAge} (fourchette: ${ageRange.Low}-${ageRange.High})`);

          const user = firstValueFrom(this.auth.user$);
          this.logAgeVerificationAttempt(user, imageUrl, estimatedAge, estimatedAge >= 18);

          if (estimatedAge >= 18) {
            this.auth.loginWithRedirect();
          } else {
            alert(`Désolé, vous semblez avoir environ ${estimatedAge} ans. Vous devez avoir au moins 18 ans pour accéder à ce site.`);
          }
        },
        error: (err) => {
          console.error('Erreur de vérification:', err);
          this.auth.user$.subscribe(user => {
            this.logAgeVerificationAttempt(user, imageUrl, null, false);
          }).unsubscribe();
          alert('Échec de la vérification d\'âge. Veuillez réessayer.');
        }
      });
    } catch (error) {
      console.error('Erreur:', error);
      this.auth.user$.subscribe(user => {
        this.logAgeVerificationAttempt(user, imageUrl, null, false);
      }).unsubscribe();
      alert('Une erreur inattendue est survenue.');
    }
  }

  private logAgeVerificationAttempt(user: any, imageUrl: string, estimatedAge: number | null, success: boolean) {
    const payload = {
      user,
      imageUrl,
      estimatedAge,
      success,
      timestamp: new Date().toISOString()
    };
    this.http.post('http://localhost:3100/age-verification-attempt', payload).subscribe({
      next: () => {},
      error: (err) => { console.error('Erreur lors de l\'envoi de la tentative au backend', err); }
    });
  }
}
