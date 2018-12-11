import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from '../../models/users/user.interface';
import { Observable } from 'rxjs';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
import { Pages } from '../../utils/constants'
import { mergeMap } from 'rxjs/operators';
import { FriendsServiceProvider } from '../../providers/friends-service/friends-service';

/**
 * Generated class for the FriendSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-friend-search',
  templateUrl: 'friend-search.html',
})
export class FriendSearchPage {

  public users: Observable<User[]>;
  public friends: User[] = [];
  searchValue: string = '';

  // ea=email address, flname=First and last name, un=username
  searchBy: string = '';
  placeholder: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private afs: AngularFirestore,
    private alertControl: UtilitiesProvider,
    private friendProv: FriendsServiceProvider) {

    this.friends = navParams.get('item');

    this.searchBy = 'email';
    this.placeholder = 'Search by Email Address';
  }

  ionViewWillLoad() {
    this.queryBySearchEntry();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendSearchPage');
  }

  userClicked(user) {
    console.log('Sent: ' + JSON.stringify(user));

    this.navCtrl.push(Pages.USER_PROFILE, { item: user });
  }

  async addFriendClicked(receiver: User) {
    var title: string = 'Send Request';
    var msg: string = `Send Friend Request to ${receiver.firstName} ${receiver.lastName}?`;

    // Check if already friend
    var isFriend: boolean = false;

    if (this.friends) {
        this.friends.forEach(friend => {
          if (receiver.uid === friend.uid)
            isFriend = true;
          else
            isFriend = false;
        });
    }

    if (!isFriend) {
      try {
        this.alertControl.confirmAlert(title, msg, async () => {
          await this.friendProv.sendFriendRequestToUser(receiver);
        })

      } catch (e) {
        console.log(e);
        this.alertControl.showToast("Something went wrong. Could not send friend request.");
      }
    }
    else {
      this.alertControl.showToast('This user is already your friend...');
    }
  }

  queryBySearchEntry() {

    if (this.searchBy === 'email') {
      this.placeholder = 'Search by Email Address';

    } else if (this.searchBy === 'fullName') {
      this.placeholder = 'Search by Full Name'

    } else {
      this.placeholder = 'Search by Username'
    }

    let query1: Observable<User[]> = this.afs.collection<User>('users', ref => ref
      .orderBy(this.searchBy.toLowerCase())
      .startAt(this.searchValue.toLowerCase())
      .endAt(this.searchValue.toLowerCase() + "\uf8ff")
      .limit(10))
      .valueChanges();

    let query2: Observable<User[]> = this.afs.collection<User>('users', ref => ref
      .orderBy(this.searchBy)
      .startAt(this.searchValue.toLowerCase())
      .endAt(this.searchValue.toLowerCase() + "\uf8ff")
      .limit(10))
      .valueChanges();

    this.users = query1.pipe(mergeMap(data => query2));
  }

  queryByArray() {
    this.users = this.afs.collection<User>('users', ref => ref
      .where('caseSensitive', 'array-contains', this.searchValue.toLowerCase())
      .limit(10))
      .valueChanges();
  }

  // queryExample() {
  //   let retardedUsers = this.data.collection<User>('users', ref =>
  //     ref.where("retarded", "==", true)).valueChanges();

  //   return this.data.collection<any>('users', ref => 
  //     ref.where("retarded", "==", true)
  //         .orderBy("lastName", "desc")
  //         .limit(3)

  //       .orderBy("lastName")
  //       // etc etc
  //   ).valueChanges();              

  //   Returns and observable<T> return this.data.collection<any>
  // }

  selectSearchFilter() {
    this.alertControl.searchFriendFilterAlert(data => {
      this.searchBy = data;
      this.queryBySearchEntry();
    })
  }

}
