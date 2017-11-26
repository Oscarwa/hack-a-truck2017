import { Component, OnInit } from '@angular/core';
import { TrailerService } from '../trailer.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Trailer } from '../trailer';
import { Park } from '../park';
import { ParkService } from '../park.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trailer-checkout',
  templateUrl: './trailer-checkout.component.html',
  styleUrls: ['./trailer-checkout.component.css']
})
export class TrailerCheckoutComponent implements OnInit {
  trailer: Trailer = <Trailer>{ arrival: {year:0,month:0,day:0} };
  park = <any>{};
  id: string;
  date: any;

  constructor(
    private trailerService: TrailerService, 
    private parkService: ParkService, 
    private route: ActivatedRoute,
    private _location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    let $trailer = this.trailerService.getById(this.id);
    $trailer.subscribe(res => {
      this.trailer = res;
      this.trailer.operatorOut = res.operatorIn;
      this.trailer.licenseNumberOut = res.licenseNumberIn;
    });

    let $park = this.parkService.searchByTrailer(this.id);
    $park.subscribe(res => {
      if(!!res && res.length) {
        this.park = res[0];
      }
    });
  }

  goBack() {
    this._location.back();
  }

  onSubmit() {
    this.trailer.active = false;
    this.trailerService.update(this.id, this.trailer);

    this.parkService.freeSpot(this.park.$key);   

    this.router.navigate(['/']);
  }

}
