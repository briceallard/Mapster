import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../models/users/user.interface';
import { Observable, forkJoin, of } from 'rxjs';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
import { Pages } from '../../utils/constants'
import { mergeMap } from 'rxjs/operators';

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
  searchValue: string = '';

  // ea=email address, flname=First and last name, un=username
  searchBy: string = '';
  placeholder: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private data: AngularFirestore,
    private auth: AuthProvider,
    private alertControl: UtilitiesProvider) {

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
    this.alertControl.confirmAlert('User Clicked', user.uid, data => {
      console.log('User Clicked: ' + user.uid)
    });

    this.navCtrl.push(Pages.USER_PROFILE, {
      item: user
    });
  }

  queryBySearchEntry() {
    if (this.searchBy === 'email') {
      this.placeholder = 'Search by Email Address';
    } else if (this.searchBy === 'fullName') {
      this.placeholder = 'Search by Full Name'
    } else {
      this.placeholder = 'Search by Username'
    }

    let query1: Observable<User[]> = this.data.collection<User>('users', ref => ref
      .orderBy(this.searchBy.toLowerCase())
      .startAt(this.searchValue.toLowerCase())
      .endAt(this.searchValue.toLowerCase() + "\uf8ff")
      .limit(10))
      .valueChanges();

    let query2: Observable<User[]> = this.data.collection<User>('users', ref => ref
      .orderBy(this.searchBy)
      .startAt(this.searchValue.toLowerCase())
      .endAt(this.searchValue.toLowerCase() + "\uf8ff")
      .limit(10))
      .valueChanges();

    this.users = query1.pipe(mergeMap(data => query2));

  }

  queryByArray() {
    this.users = this.data.collection<User>('users', ref => ref
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

  confirmFriendRequest() {
    var title: 'Confirm';
    var message: 'Add this user as a friend?';
    this.alertControl.confirmAlert(title, message, (console.log('Request')));
    // SEND REQUEST MESSAGE AS CALLBACK ABOVE    
  }

  selectSearchFilter() {
    this.alertControl.searchFriendFilterAlert(data => {
      this.searchBy = data;
      this.queryBySearchEntry();
    })
  }

}
