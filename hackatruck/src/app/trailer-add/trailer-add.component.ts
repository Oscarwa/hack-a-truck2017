import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'; 
import { Observable } from 'rxjs/Observable';
import { Trailer } from '../trailer';
import { Router } from '@angular/router';
import { ParkService } from '../park.service';
import { Category } from '../categories';
import { TrailerService } from '../trailer.service';

@Component({
  selector: 'app-trailer-add',
  templateUrl: './trailer-add.component.html',
  styleUrls: ['./trailer-add.component.css']
})
export class TrailerAddComponent implements OnInit {
  categories: Category[];
  trailer: Trailer = <Trailer>{ };
  submitted = false;
  date: any;

  constructor(private db: AngularFireDatabase, private router: Router, private parkService: ParkService, private trailerService: TrailerService) {
  }

  ngOnInit() {
    this.trailer.isLoaded = true;
    this.trailer.active = true;
    let now = new Date();
    this.trailer.arrival = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};

    this.categories = this.trailerService.getCategories();
    // let newArray = [];
    // for(let i = 1; i <= 200; i++) {
    //   let newItem = {area: i <= 100 ? 'A' : 'B', number: i <= 100 ? i : i - 100, id: null};
    //   this.db.list('parks').push(newItem)
    // }
  }

  onSubmit() {
    this.submitted = true;
    // console.log(this.trailer)
    this.db.list('trailers').push(this.trailer).then(r => {
      (function(r, self) { 
        if(self.trailer.isLoaded) {
          let $parks = self.parkService.getWhere('B');
          $parks.subscribe(res =>  {
            let tmpParks = res.filter((item, index) => item.id == null && item.number >= (self.trailer.category - 1) * 25).sort(self.parkSort);
              if(!!tmpParks.length) { //empty spaces found, assign the nearest one
                self.parkService.update(tmpParks[0].$key, r.key)
                self.router.navigate(['/trailers/' + r.key]);                
              }
          });
        } else {
          //not loaded, goes to area 'A'
          let $parks = self.parkService.getWhere('A');
          let departure = self.trailer.estimatedDeparture;
          if(self.dateDiffInDays(new Date(), new Date(departure.year, departure.month - 1, departure.day)) > 30) {
            $parks.subscribe(res =>  {
              let tmpParks = res.filter((item, index) => item.id == null).sort(self.parkSort);
                if(!!tmpParks.length) { //empty spaces found, assign the nearest one
                  self.parkService.update(tmpParks[0].$key, r.key);
                  self.router.navigate(['/trailers/' + r.key]);                
                }
            });
          } else {
            $parks.subscribe(res =>  {
              let tmpParks = res.filter((item, index) => item.id == null && item.number >= 51).sort(self.parkSort);
              if(!!tmpParks.length) { //empty spaces found, assign the nearest one
                self.parkService.update(tmpParks[0].$key, r.key);
                self.router.navigate(['/trailers/' + r.key]);
              }
            });
          }
        }
      })(r, this);
    });
    //console.info(key)
  }

  parkSort(a, b) { return a.number - b.number };

  dateDiffInDays(a, b) {
    // Discard the time and time-zone information.
    var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  
    return Math.floor((utc2 - utc1) / 1000 * 60 * 60 * 24);
  }

}
