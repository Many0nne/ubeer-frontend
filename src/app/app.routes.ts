import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BreweryComponent } from './brewery/brewery.component';
import { BreweryDetailsComponent } from './brewery-details/brewery-details.component';
import { BeerComponent } from './beer/beer.component';
import { CreateBreweryComponent } from './create-brewery/create-brewery.component';
import { AgeVerificationComponent } from './age-verification/age-verification.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'breweries', component: BreweryComponent },
    { path: 'brewery/:id', component: BreweryDetailsComponent },
    { path: 'breweries/new', component: CreateBreweryComponent },
    { path: 'beers', component: BeerComponent},
    { path: 'verify-age', component: AgeVerificationComponent }
];
