  import { Injectable, NgZone } from '@angular/core';
  import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
  import { Geolocation, Geoposition } from '@ionic-native/geolocation';
  import 'rxjs/add/operator/filter';
  import { LocationProvider } from '../location/location';
  import { Location } from '../../models/users/location.interface';
  import { User } from '../../models/users/user.interface';
  import { AuthProvider } from '../../providers/auth/auth';

  /*
    Generated class for the LocationTrackerProvider provider.

    See https://angular.io/guide/dependency-injection for more info on providers
    and Angular DI.
  */

  @Injectable()
  export class LocationTrackerProvider {
    public watch: any;   
    public lat: number = 0;
    public lng: number = 0;
    public timestamp: number = 0;

    constructor(public zone: NgZone, private backgroundGeolocation: BackgroundGeolocation, private geolocation: Geolocation,
      public locSrvc: LocationProvider, private auth: AuthProvider) {
      console.log('Hello LocationTrackerProvider Provider');
    }

    async startTracking() {
    let user: User = await this.auth.getAuthenticatedUser();

    // Foreground Tracking
  
  let options = {
    frequency: 3000,
    enableHighAccuracy: true
  };
  
  this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
  
    
    // Run update inside of Angular's zone
    this.zone.run(() => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;  
    });


    

  });
    }
  
    stopTracking() {
      console.log('stopTracking');
      
      this.backgroundGeolocation.finish();
      this.watch.unsubscribe();
  
    }

  }
