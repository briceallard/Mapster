import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Location } from '../../models/users/location.interface';

/*
  Generated class for the MapProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MapProvider {

  constructor(public geo: Geolocation, private firestore: AngularFirestore) {
    console.log('Hello MapProvider Provider');
  }

  getAllUserLocations(): Observable<Location[]> {
    return this.firestore.collection<Location>('locations').valueChanges();
  }

}
