import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'; 
import { Park } from './park';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { AngularFireList, AngularFireObject } from 'angularfire2/database/interfaces';
import { Promise } from 'q';

@Injectable()
export class ParkService {

  getAll(): Observable<Park[]> {
    return this.db.list<Park>('parks').valueChanges();
  }

  getWhere(_area: string): Observable<any> {
    return this.db.list<Park>('/parks', ref => ref.orderByChild('area').equalTo(_area)).snapshotChanges()
      .map(actions => {
        return actions.map(action => {
          const $key = action.payload.key;
          const data = { $key, ...action.payload.val() };
          return data;
        })
      });
  }

  freeSpot(id: string) {
    this.db.object('/parks/' + id + '/id').set(null);
  }

  searchByTrailer(id: string): Observable<any> {
    return this.db.list<Park>('/parks', ref => ref.orderByChild('id').equalTo(id)).snapshotChanges()
    .map(actions => {
      return actions.map(action => {
        const $key = action.payload.key;
        const data = { $key, ...action.payload.val() };
        return data;
      })
    });
  }

  update(parkId: string, trailerId: string) {
    this.db.object('/parks/' + parkId + '/id').set(trailerId);
  }

  constructor(private db: AngularFireDatabase) {
  }

}
