import { Injectable } from '@angular/core';
import { User } from '../../models/users/user.interface'
import { AngularFirestore } from 'angularfire2/firestore';
import { Geoposition } from '@ionic-native/geolocation'
import { Location } from '../../models/users/location.interface';
import { DateTime } from 'ionic-angular';
import { AuthProvider } from '../auth/auth';
import { UserDataProvider } from '../userData/userData';


/*
  Generated class for the LocationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocationProvider {

  constructor(private data: AngularFirestore, private auth: AuthProvider, private user: UserDataProvider) {
    console.log('Hello LocationProvider Provider');
  }

  /**
   * Updates the users most recent location for viewing all users on map
   *
   * @param {Location} location
   * @memberof LocationProvider
   */
  async postMostRecentUserLocation(location: Location) {
    let user = await this.auth.getAuthenticatedUser();

    if (location && user && location.uid) {

      try {
        await this.data.doc<Location>(`locations/${user.uid}`).set(location);
      } catch (e) {
        throw e;
      }
    } else {
      console.log('Tried posting empty location to database!')
    }
  }

  /**
   * Adds most recent location to collection of locations for history tracking
   *
   * @param {Location} location
   * @memberof LocationProvider
   */
  async postUserLocationHistory(location: Location) {
    let user = await this.auth.getAuthenticatedUser();

    if (location && user && location.uid) {

      try {
        await this.data.doc<Location>(`users/${user.uid}/locationHistory/${location.timestamp}`).set(location);
      } catch (e) {
        throw e;
      }
    } else {
      console.log('Tried posting empty user location history to database!')
    }
  }

}
