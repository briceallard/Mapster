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
      // Background Tracking

      let user: User = await this.auth.getAuthenticatedUser();
  
    let config = {
      desiredAccuracy: 0,
      stationaryRadius: 10,
      distanceFilter: 3,
      debug: false,
      interval: 2000
    };

  
    this.backgroundGeolocation.configure(config).subscribe((location) => {
  
      console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
  
      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = location.latitude;
        this.lng = location.longitude;

        let loc: Location = {
          uid: user.uid,
          lat: this.lat,
          lon: this.lng,
          timestamp: location.time
        };

        //console.log(loc.uid + ' | ' + loc.timestamp + ' | ' + loc.lat + ' , ' + loc.lon);
        this.locSrvc.postMostRecentUserLocation(loc);
        this.locSrvc.postUserLocationHistory(loc);

      });
  
    }, (err) => {
  
      console.log(err);
  
    });
  
    // Turn ON the background-geolocation system.
    this.backgroundGeolocation.start();
  
    
  
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
