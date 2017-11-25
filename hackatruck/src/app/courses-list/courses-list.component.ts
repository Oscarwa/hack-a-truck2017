import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'; 
import { Observable } from 'rxjs/Observable';
import { Trailer } from '../trailer';
@Component({
  selector: 'courses-list',
  templateUrl: 'courses-list.component.html',
  styles: []
})
export class CoursesListComponent implements OnInit {
  coursesObservable: Observable<Trailer[]>;
  constructor(private db: AngularFireDatabase) { }
  ngOnInit() {
    this.coursesObservable = this.getCourses('/trailers');
  }
  getCourses(listPath): Observable<Trailer[]> {
    return this.db.list<Trailer>(listPath).valueChanges();
  }
}