import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public modal: ModalController) {
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {

    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyCO8ryKRAkT2zPwSJLWJQKsQVr-JHSqAYY',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyCO8ryKRAkT2zPwSJLWJQKsQVr-JHSqAYY'
    });

    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: 38.8979,
           lng: -77.0365
         },
         zoom: 18,
         tilt: 0
       }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

  }

  public openProfileModal() {
    let profileModal = this.modal.create(Pages.MODAL_PROFILE);
    profileModal.present();
  }

}
