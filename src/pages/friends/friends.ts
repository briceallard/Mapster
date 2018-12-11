import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Pages } from '../../utils/constants';
import { FriendsServiceProvider } from '../../providers/friends-service/friends-service';
import { Observable } from 'rxjs';
import { User } from '../../models/users/user.interface';
import { UtilitiesProvider } from '../../providers/utilities/utilities';


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

  public friends: User[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modal: ModalController,
    public friendProv: FriendsServiceProvider,
    public toastCtrl: UtilitiesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendsPage');
  }

  ionViewWillLoad() {
    this.updateFriendsList();

    console.log('Friends list contains: ' + JSON.stringify(this.friends));
  }

  public openProfileModal() {
    let profileModal = this.modal.create(Pages.MODAL_PROFILE);
    profileModal.present();
  }

  async updateFriendsList() {
    try {
      (await this.friendProv.getFriendsList())
        .subscribe(async (friends: Promise<User>[]) => {
          friends.forEach(async (friend: Promise<User>) => {
            this.friends.push(await friend);
          })             
        })
    } catch (e) {
      console.log(e.message);
    }
  }

  addFriendClicked() {
    this.navCtrl.push(Pages.FRIEND_SEARCH_PAGE, { item: this.friends });
  }

  async removeFriendClicked(friend: User) {
    let title = 'Remove Friend';
    let msg = `Delete ${friend.firstName} ${friend.lastName} from friends list?`;

    this.toastCtrl.confirmAlert(title, msg, async () => {
      await this.friendProv.deleteFriend(friend, this.friends);
      await this.updateFriendsList();
    });
  }
}
