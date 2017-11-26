import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TrailerService } from '../trailer.service';
import { Observable } from 'rxjs/Observable';
import { Trailer } from '../trailer';
import { Router } from '@angular/router/src/router';
import { Category } from '../categories';

@Component({
  selector: 'app-trailer-detail',
  templateUrl: './trailer-detail.component.html',
  styleUrls: ['./trailer-detail.component.css']
})
export class TrailerDetailComponent implements OnInit {
  trailer: Trailer;
  trailerExt: {
    daysSinceArrival: string,
    daysUntilDeparture: string,
    category: string,
    folio: string
  };
  loaded: boolean;
  qrCode: any;
  categories: Category[];

  constructor(private route: ActivatedRoute,
    private trailerService: TrailerService,
    private location: Location) { }

  ngOnInit() {
    this.categories = this.trailerService.getCategories();
    this.getTrailerDetails();
  }

  getTrailerDetails() {
    const id = this.route.snapshot.paramMap.get('id');
    let $trailer = this.trailerService.getById(id);
    $trailer.subscribe(res => {
      this.trailer = res;
      let arrival = this.daydiff(new Date(res.arrival.year, res.arrival.month - 1, res.arrival.day), new Date());
      let departure = this.daydiff(new Date(), new Date(res.estimatedDeparture.year, res.estimatedDeparture.month - 1, res.estimatedDeparture.day));

      this.trailerExt = {
        daysSinceArrival: arrival - 1 == 0 ? '(hoy)' : arrival - 1 > 0 ? `(hace ${arrival} dias)` : '' ,
        daysUntilDeparture: departure > 0 ? `(en ${departure} dias)` : `(hace ${arrival} dias)`,
        category: this.categories.filter((item) => item.value == this.trailer.category)[0].label,
        folio: id
      }
      this.loaded = true;
    });
  }

  daydiff(first, second) {
    return Math.round((second-first)/(1000*60*60*24));
  }

}
