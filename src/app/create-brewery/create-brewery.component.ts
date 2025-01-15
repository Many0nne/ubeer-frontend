import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-brewery',
  templateUrl: './create-brewery.component.html',
  styleUrls: ['./create-brewery.component.scss'],
  imports: [CommonModule, NavbarComponent, ReactiveFormsModule],
  standalone: true,
})
export class CreateBreweryComponent {
  breweryForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.breweryForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      profileImage: [null, Validators.required],
      bannerImage: [null, Validators.required],
    });
    this.router = router;
  }


  onFileChange(event: any, fieldName: string): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.breweryForm.patchValue({ [fieldName]: file });
    }
  }

  goBack(): void {
    this.router.navigate(['/breweries']);
  }

  onSubmit(): void {
    if (this.breweryForm.valid) {
      const formData = new FormData();
      formData.append('name', this.breweryForm.get('name')?.value);
      formData.append('address', this.breweryForm.get('address')?.value);
      formData.append('profile_picture_id', this.breweryForm.get('profileImage')?.value);
      formData.append('banner_picture_id', this.breweryForm.get('bannerImage')?.value);

      this.http.post('http://localhost:3100/breweries', formData).subscribe({
        next: (response) => {
          console.log('Brewery created successfully', response);
          // Rediriger l'utilisateur vers la liste des brasseries
          this.router.navigate(['/breweries']);
        },
        error: (error) => {
          console.error('Error creating brewery', error);
        },
      });
    }
  }
}
