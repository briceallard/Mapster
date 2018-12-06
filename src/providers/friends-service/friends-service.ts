import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthProvider } from '../auth/auth';
import { User } from '../../models/users/user.interface';

/*
  Generated class for the FriendsServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FriendsServiceProvider {

  constructor(private afs: AngularFirestore, private auth: AuthProvider) {
    console.log('Hello FriendsServiceProvider Provider');
  }

  async sendFriendRequestToUser(receiver: User, sender: User) {
    
  }

}
