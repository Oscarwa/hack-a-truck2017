import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'; 
import { Observable } from 'rxjs/Observable';
import { Trailer } from '../trailer';
import { TrailerService } from '../trailer.service';
@Component({
  selector: 'app-trailers',
  templateUrl: './trailers.component.html',
  styleUrls: ['./trailers.component.css']
})
export class TrailersComponent implements OnInit {
  trailers: Trailer[];
  constructor(private trailerService: TrailerService) { }
  
  ngOnInit() {
    let $trailers = this.trailerService.getAllPlus();
    $trailers.subscribe(res => {
      this.trailers = res;
    });
  }
}
