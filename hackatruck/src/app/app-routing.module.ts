import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TrailersComponent } from './trailers/trailers.component';
import { TrailerAddComponent } from './trailer-add/trailer-add.component';
import { ParkingLotComponent } from './parking-lot/parking-lot.component';
import { HomeComponent } from './home/home.component';
import { TrailerDetailComponent } from './trailer-detail/trailer-detail.component';
import { TrailerCheckoutComponent } from './trailer-checkout/trailer-checkout.component';

const routes: Routes = [
  { path: 'trailers', component: TrailersComponent },
  { path: 'trailers/checkin', component: TrailerAddComponent },
  { path: 'trailers/checkout/:id', component: TrailerCheckoutComponent },
  { path: 'trailers/:id', component: TrailerDetailComponent },
  { path: 'parking-lot', component: ParkingLotComponent },
  { path: 'home', component: HomeComponent },  
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }