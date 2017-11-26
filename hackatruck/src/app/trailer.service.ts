import { Injectable } from '@angular/core';
import { Trailer } from './trailer';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireObject } from 'angularfire2/database/interfaces';
import { Category } from './categories';

@Injectable()
export class TrailerService {
  
  getAll(): Observable<Trailer[]> {
    return this.db.list<Trailer>('trailers').valueChanges();
  }

  getAllPlus(): Observable<Trailer[]> {
    return this.db.list<Trailer>('/trailers').snapshotChanges()
    .map(actions => {
      return actions.map(action => {
        const $key = action.payload.key;
        const data = { $key, ...action.payload.val() };
        return data;
      })
    });
  }

  getById(id: string) : Observable<Trailer> {
    return this.db.object<Trailer>('trailers/' + id).valueChanges();
  }

  update(id: string, item: Trailer) {
    this.db.object<Trailer>('trailers/' + id).update(item);
  }

  getCategories() : Category[] {
    return [
      {value: 1, label: 'Comida'},
      {value: 2, label: 'Electronica'},
      {value: 3, label: 'Textil'},
      {value: 4, label: 'Varios'},
      {value: 5, label: 'Vacio'},
    ]
  }

  constructor(private db: AngularFireDatabase) { }

}
