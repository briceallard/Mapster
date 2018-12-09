import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pages } from '../../utils/constants'
import { FriendsServiceProvider } from '../../providers/friends-service/friends-service';
import { Observable } from 'rxjs';
import { User } from '../../models/users/user.interface';
import { FriendRequest } from '../../models/users/friendRequest.interface';
import { AuthProvider } from '../../providers/auth/auth';
import { UserDataProvider } from '../../providers/userData/userData';
import { UtilitiesProvider } from '../../providers/utilities/utilities';

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
    private auth: AuthProvider,
    private data: UserDataProvider,
    public alertCtrl: UtilitiesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendRequestsPage');
  }
  
  ionViewWillLoad() {
    this.getAllFriendRequests();
  }
  
  // userClicked(request) {
  //   this.navCtrl.push(Pages.USER_PROFILE, { item: request });
  // }
  
  async acceptFriendRequest(request: FriendRequest) {
    var title = 'Friend Request';
    var msg = `Accept friend request from ${request.fromName}?`;

    this.alertCtrl.confirmAlert(title, msg, async () => {
      await this.friendProv.onFriendRequestAccept(request);
    })
  }
  
  declineFriendRequest(request) {
    this.friendProv.onFriendRequestDecline(request);
  }
  
  async getAllFriendRequests() {
    this.requests = await this.friendProv.getAllFriendRequestsInbox();
  }
}
