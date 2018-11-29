import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../models/users/user.interface';
import { Observable } from 'rxjs';
import { UtilitiesProvider } from '../../providers/utilities/utilities';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private data: AngularFirestore,
    private auth: AuthProvider,
    private alertControl: UtilitiesProvider
  ) {

  }

  ionViewWillLoad() {
    this.updateUserList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendSearchPage');
  }

  updateUserList() {
    this.users = this.data.collection<User>('users').valueChanges();
  }

  // search() {
  //   let self = this;
  //   self.results = self.afs.collection(`users`, ref => ref
  //     .orderBy("username")
  //     .startAt(self.searchValue.toLowerCase())
  //     .endAt(self.searchValue.toLowerCase()+"\uf8ff")
  //     .limit(10))
  //     .valueChanges();
  // }

  queryBySearchEntry() {
    this.users = this.data.collection<User>('users', ref => ref
    .orderBy("userName")
    .startAt(this.searchValue.toLowerCase())
    .endAt(this.searchValue.toLowerCase()+"\uf8ff")
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
    this.alertControl.confirmAlert(title, message,(console.log('Request')));
    // SEND REQUEST MESSAGE AS CALLBACK ABOVE    
  }

}
