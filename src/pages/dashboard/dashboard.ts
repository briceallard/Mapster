import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { FriendsServiceProvider } from '../../providers/friends-service/friends-service';
import { Subscription } from 'rxjs';
import { Pages } from '../../utils/constants'
import { UserDataProvider } from '../../providers/userData/userData';
import { User } from '../../models/users/user.interface';

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

  profile = {} as User;
  imageHolder: string;
  friendCount: number;
  requests$: Subscription;
  profile$: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private auth: AuthProvider,
    private afs: AngularFirestore,
    public friends: FriendsServiceProvider,
    public data: UserDataProvider,
    public modal: ModalController) {
      this.profile.profileImage = 'https://firebasestorage.googleapis.com/v0/b/mapster-3ccc5.appspot.com/o/profileImages%2Fdefault_profile.png?alt=media&token=6bbc4366-1ab0-4260-a778-52810ab674b4';
  }

  ionViewWillLoad() {
    this.updateFriendRequestCount();
    this.getUserProfileData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  ionViewWillClose() {
    if (this.requests$)
      this.requests$.unsubscribe();
    if (this.profile$)
      this.profile$.unsubscribe();
  }

  friendRequestsClicked() {
    this.navCtrl.push(Pages.FRIEND_REQUEST_PAGE);
  }

  publicPhotosClicked() {
    this.navCtrl.push(Pages.IMAGES_PAGE);
  }

  public openProfileModal() {
    let profileModal = this.modal.create(Pages.MODAL_PROFILE);
    profileModal.onDidDismiss((logout) => { if (logout) this.navCtrl.setRoot(Pages.LOGIN_PAGE) });
    profileModal.present();
  }

  async getUserProfileData() {
    this.profile$ = (await this.data.getAuthenticatedUserProfileRealTime())
      .subscribe((profile) => this.profile = profile);
  }

  async updateFriendRequestCount() {
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
