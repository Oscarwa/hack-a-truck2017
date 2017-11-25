import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TrailersComponent } from './trailers/trailers.component';
//import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'trailers', component: TrailersComponent },
  //{ path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }