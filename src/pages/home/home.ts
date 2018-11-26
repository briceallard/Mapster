import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { Pages } from '../../utils/constants';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';

import { UserDataProvider } from '../../providers/userData/userData';
import { Subscription } from 'rxjs';
import { Geolocation } from '@ionic-native/geolocation';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
import { LocationProvider } from '../../providers/location/location';
import { Location } from '../../models/users/location.interface';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  map: GoogleMap;
  profileImage: string;
  profileImage$: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modal: ModalController,
    private data: UserDataProvider,
    public utilities: UtilitiesProvider,
    public alert: AlertController,
    private geo: Geolocation,
    public locSrvc: LocationProvider
  ) {
  }

  ionViewDidLoad() {
    //this.loadMap();
    //this.updateProfileMsgs();
  }

  // Maybe better performance??
  ionViewWillLoad() {
    this.loadMap();
    this.updateProfileMsgs();
  }

  ionViewWillLeave() {
    if (this.profileImage$)
      this.profileImage$.unsubscribe();
  }

  /**
   * Loads google maps based on users current location
   *
   * @memberof HomePage
   */
  async loadMap() {

    try {
      Environment.setEnv({
        'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyCO8ryKRAkT2zPwSJLWJQKsQVr-JHSqAYY',
        'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyCO8ryKRAkT2zPwSJLWJQKsQVr-JHSqAYY'
      });

      let position = await this.geo.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 60000
      });

      let location: Location = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        timestamp: position.timestamp
      };

      this.locSrvc.postMostRecentUserLocation(location);
      this.locSrvc.postUserLocationHistory(location);

      let mapOptions: GoogleMapOptions = {
        camera: {
          target: {
            lat: location.lat,
            lng: location.lon
          },
          zoom: 18,
          tilt: 0
        }
      };

      this.map = GoogleMaps.create('map_canvas', mapOptions);

      let marker: Marker = this.map.addMarkerSync({
        title: 'My Location',
        icon: 'blue',
        animation: 'DROP',
        position: {
          lat: location.lat,
          lng: location.lon
        }
      });

      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        // Do something here on marker click
      })

    } catch (e) {
      this.utilities.showToast(e.message);
    }

  }

  /**
   * Profile Page click event
   *
   * @memberof HomePage
   */
  public openProfileModal() {
    let profileModal = this.modal.create(Pages.MODAL_PROFILE);
    profileModal.onDidDismiss((logout) => { if (logout) this.navCtrl.setRoot(Pages.LOGIN_PAGE) });
    profileModal.present();

  }

  /**
   * Updates profile image on load
   *
   * @memberof HomePage
   */
  async updateProfileMsgs() {
    if (await this.data.profileExists()) {
      this.profileImage$ = (await this.data.getAuthenticatedUserProfileRealTime())
        .subscribe((profile) => this.profileImage = profile.profileImage);
    }
  }

}
