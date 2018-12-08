import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pages } from '../../utils/constants'
import { FriendsServiceProvider } from '../../providers/friends-service/friends-service';
import { Observable } from 'rxjs';
import { User } from '../../models/users/user.interface';
import { FriendRequest } from '../../models/users/friendRequest.interface';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the FriendRequestsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-friend-requests',
  templateUrl: 'friend-requests.html',
})
export class FriendRequestsPage {

  public requests: Observable<FriendRequest[]>;
  public users: Observable<User[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public friendProv: FriendsServiceProvider,
    private auth: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendRequestsPage');
  }

  userClicked(user) {
    console.log('Sent: ' + JSON.stringify(user));
    this.navCtrl.push(Pages.USER_PROFILE, { item: user });
  }

  acceptFriendRequest(friend) {
    this.friendProv.onFriendRequestAccept(friend);
  }

  declineFriendRequest(friend) {
    this.friendProv.onFriendRequestDecline(friend);
  }

  async getFriendsList() {
    this.requests = await this.friendProv.getAllFriendRequestsInbox();
  }
}
