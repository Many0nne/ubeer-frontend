import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { FaceVerificationService } from '../face-verification.service';
import { environment } from '../../environments/environment.development'; // Assurez-vous que le chemin est correct

@Component({
  selector: 'app-verifiy-age-popup',
  imports: [CommonModule],
  templateUrl: './verifiy-age-popup.component.html',
  styleUrl: './verifiy-age-popup.component.scss'
})
export class VerifiyAgePopupComponent {
  showModal = false;

  // Remplace par tes infos Cloudinary
  private cloudName = environment.cloudName || '';
  private uploadPreset = environment.uploadPreset || '';

  constructor(
    @Inject(DOCUMENT) public document: Document, 
    public auth: AuthService,
    @Inject(FaceVerificationService) private faceVerification: FaceVerificationService
  ) {}

  showAgePopup: boolean = true;
  confirmAge(isOfAge: boolean): void {
    if (isOfAge) {
      this.setCookie('ageConfirmed', 'true', 30); // Cookie valable 30 jours
      this.showAgePopup = false;
      this.showModal = true; // Affiche le modal pour l'upload de l'image
    } else {
      window.location.href = "https://www.google.com";
    }
  }
  setCookie(name: string, value: string, days: number) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
  }
  getCookie(name: string) {
    return document.cookie.split('; ').reduce((r, v) => {
      const parts = v.split('=');
      return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '');
  }
  ngOnInit(): void {
    // Vérifie le cookie à l'initialisation
    if (this.getCookie('ageConfirmed') === 'true') {
      this.showAgePopup = true;
    }
  }
  
  async handleImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      try {
        const imageUrl = await this.uploadToCloudinary(file);
        
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

          if (estimatedAge >= 18) {
            this.setCookie('ageConfirmed', 'true', 30); // Cookie valable 30 jours
            this.showAgePopup = false;
            this.auth.loginWithRedirect();
          } else {
            alert(`Désolé, vous semblez avoir environ ${estimatedAge} ans. Vous devez avoir au moins 18 ans pour accéder à ce site.`);
          }
        },
        error: (err) => {
          console.error('Erreur de vérification:', err);
          alert('Échec de la vérification d\'âge. Veuillez réessayer.');
        }
      });
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur inattendue est survenue.');
    }
  }

}
