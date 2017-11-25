import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment' 
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { AppRoutingModule } from './/app-routing.module';
import { TrailersComponent } from './trailers/trailers.component';
import { TrailerAddComponent } from './trailer-add/trailer-add.component';

import { ParkService } from './park.service';
import { ParkingLotComponent } from './parking-lot/parking-lot.component';
import { HomeComponent } from './home/home.component';
import { TrailerService } from './trailer.service';
import { TrailerDetailComponent } from './trailer-detail/trailer-detail.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    CoursesListComponent,
    TrailersComponent,
    TrailerAddComponent,
    ParkingLotComponent,
    HomeComponent,
    TrailerDetailComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxChartsModule
  ],
  providers: [ ParkService, TrailerService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
