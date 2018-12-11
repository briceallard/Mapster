import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { FriendsServiceProvider } from '../../providers/friends-service/friends-service';
import { Subscription } from 'rxjs';
import { Pages } from '../../utils/constants'

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  friendCount: number;
  requests$: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private auth: AuthProvider,
    private afs: AngularFirestore,
    public friends: FriendsServiceProvider) {
  }

  ionViewWillLoad() {
    this.updateFriendRequestCount();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  ionViewWillClose() {
    if(this.requests$)
      this.requests$.unsubscribe();
  }

  friendRequestsClicked() {
    this.navCtrl.push(Pages.FRIEND_REQUEST_PAGE);
  }

  async updateFriendRequestCount() {
    let user = await this.auth.getAuthenticatedUser();
    this.requests$ = (await this.friends.getAllFriendRequestsInbox())
      .subscribe((request) => this.friendCount = request.length);
  }

  acceptFriendRequest(friend) {
    this.friends.onFriendRequestAccept(friend);
  }

  declineFriendRequest(friend) {
    this.friends.onFriendRequestDecline(friend);
  }
  

}
