import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'; 
import { Observable } from 'rxjs/Observable';
import { Trailer } from '../trailer';
@Component({
  selector: 'app-trailers',
  templateUrl: './trailers.component.html',
  styleUrls: ['./trailers.component.css']
})
export class TrailersComponent implements OnInit {
  trailersObservable: Observable<Trailer[]>;
  constructor(private db: AngularFireDatabase) { }
  ngOnInit() {
    this.trailersObservable = this.getTrailers('/trailers');
  }
  getTrailers(listPath): Observable<Trailer[]> {
    return this.db.list<Trailer>(listPath).valueChanges();
  }
}
