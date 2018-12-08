import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Pages } from '../../utils/constants';
import { FriendsServiceProvider } from '../../providers/friends-service/friends-service';
import { Observable } from 'rxjs';
import { User } from '../../models/users/user.interface';


/**
 * Generated class for the FriendsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {

  public friends: Observable<User[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modal: ModalController,
    public friendProv: FriendsServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendsPage');
  }

  ionViewWillLoad() {
    this.friendProv.getFriendsList();
  }

  public openProfileModal() {
    let profileModal = this.modal.create(Pages.MODAL_PROFILE);
    profileModal.present();
  }

  addFriendClicked() {
    this.navCtrl.push(Pages.FRIEND_SEARCH_PAGE, { item: this.friends });
  }

}
