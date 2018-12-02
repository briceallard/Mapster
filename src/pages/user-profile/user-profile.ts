import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/users/user.interface';
import { AngularFireStorage } from 'angularfire2/storage';
import { UserDataProvider } from '../../providers/userData/userData';

/**
 * Generated class for the UserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  public user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: AngularFireStorage,
    public userData: UserDataProvider) {
    this.user = navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfilePage');
  }

  loadUserProfileView() {
    
  }

}
