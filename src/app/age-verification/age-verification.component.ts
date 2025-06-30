import { Component } from '@angular/core';
import { AgeVerificationService } from '../services/age-verification.service';

@Component({
  selector: 'app-age-verification',
  templateUrl: './age-verification.component.html',
  styleUrls: ['./age-verification.component.scss']
})
export class AgeVerificationComponent {
  verificationResult: any | null = null;
  errorMessage: string | null = null;

  constructor(private ageVerificationService: AgeVerificationService) {}

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.ageVerificationService.verifyAge(file).subscribe({
        next: (result) => {
          this.verificationResult = result;
          this.errorMessage = null;
        },
        error: (error) => {
          this.errorMessage = error.error || 'Erreur lors de la vérification.';
          this.verificationResult = null;
        }
      });
    }
  }
}
