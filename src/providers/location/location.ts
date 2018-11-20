import { Injectable } from '@angular/core';
import { User } from '../../models/users/user.interface'
import { AngularFirestore } from 'angularfire2/firestore';
import { Geoposition } from '@ionic-native/geolocation'
import { Location } from '../../models/users/location.interface';
import { DateTime } from 'ionic-angular';
import { AuthProvider } from '../auth/auth';

/*
  Generated class for the LocationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocationProvider {

  constructor(private data: AngularFirestore, private auth: AuthProvider) {
    console.log('Hello LocationProvider Provider');
  }

  /**
   * Puts users new location in 'users/latestLocation/'
   * and also adds it to 'users/previousLocations'
   *
   * @param {Geoposition} geo
   * @param {string} uid
   * @memberof LocationProvider
   */
  // async postUserLocation(geo: Geoposition, uid: string) {
  //   try {
  //     await this.data.doc(`users/${uid}`).collection('latestLocation').update({
  //       lat: geo.coords.latitude,
  //       lon: geo.coords.longitude,
  //       timestamp: (new Date).getTime()
  //     });
  //     await this.data.doc(`users/${uid}`).collection('previousLocations').add({
  //       lat: geo.coords.latitude,
  //       lon: geo.coords.longitude,
  //       timestamp: (new Date).getTime()
  //     })
  //   } catch (e) {
  //     console.log(e);
  //     throw e;
  //   }
  // }
}
