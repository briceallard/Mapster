import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../models/users/user.interface';
import { Observable, forkJoin, of } from 'rxjs';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
import { Pages } from '../../utils/constants'
import { mergeMap } from 'rxjs/operators';
import { Account } from '../../models/registration/account.interface';
import { AngularFireAuth } from 'angularfire2/auth';

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

  account = {} as Account;

  public users: Observable<User[]>;
  searchValue: string = '';

  // ea=email address, flname=First and last name, un=username
  searchBy: string = '';
  placeholder: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private data: AngularFirestore,
    private authProv: AuthProvider,
    private auth: AngularFireAuth,
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
  // Brices original work of art .... But shady had to one up me, as usual
  // this.data.collection<User>('users', ref => ref
  //     .orderBy(this.searchBy.toLowerCase())
  //     .startAt(this.searchValue.toLowerCase())
  //     .endAt(this.searchValue.toLowerCase() + "\uf8ff")
  //     .limit(10))
  //     .valueChanges();

  queryByArray() {
    this.users = this.data.collection<User>('users', ref => ref
      .where('caseSensitive', 'array-contains', this.searchValue.toLowerCase())
      .limit(10))
      .valueChanges();
  }


  queryExample() {
    let retardedUsers = this.data.collection<User>('users', ref =>
      ref.where("retarded", "==", true)).valueChanges();

    // return this.data.collection<any>('users', ref => 
    //   ref.where("retarded", "==", true)
    //       .orderBy("lastName", "desc")
    //       .limit(3)

    //     .orderBy("lastName")
    //     // etc etc
    // ).valueChanges();              

    // Returns and observable<T> return this.data.collection<any>
  }

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

  sendFriendRequest(user)
  {
    //logic to get current user id
    let promiseCurrUserId = this.getUserUID();
    let currUserId;
    promiseCurrUserId.then(function(result)
    {
      console.log("result: ");
      console.log(result);
    });
    console.log("currUserId: ");
    console.log(currUserId);

    //get toUserId
    let queryRef = this.data.collection('users', ref => ref.where('email', '==', user.email));
    console.log("queryRef: ");
    console.log(queryRef);

    //writes to user's friendRequests firebase
    //var newRequest = this.data.collection('users/${this.currUserId}/friends').add(user);
    //users/<user-id>/friendRequests.add(toUserId)
  }

  async getUserUID(): Promise<any>{
    return new Promise<any>((resolve, reject) => {

      let subscription = this.auth.user.subscribe((user) => {
        
        console.log("user.uid: ");
        console.log(user.uid);
        resolve(user.uid);
 
        subscription.unsubscribe();
 
      });
 
    });
  }
}
