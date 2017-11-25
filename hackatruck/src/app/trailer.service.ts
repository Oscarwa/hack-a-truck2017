import { Injectable } from '@angular/core';
import { Trailer } from './trailer';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireObject } from 'angularfire2/database/interfaces';

@Injectable()
export class TrailerService {
  
  getAll(): Observable<Trailer[]> {
    return this.db.list<Trailer>('trailers').valueChanges();
  }

  getById(id: string) : Observable<Trailer> {
    return this.db.object<Trailer>('trailers/' + id).valueChanges();
  }

  constructor(private db: AngularFireDatabase) { }

}
