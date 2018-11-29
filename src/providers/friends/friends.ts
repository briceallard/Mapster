import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from '../../models/users/user.interface';
import { Observable } from 'rxjs';

/*
  Generated class for the FriendsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FriendsProvider {

  constructor(public data: AngularFirestore) {
    console.log('Hello FriendsProvider Provider');
  }

  // getUsers(start, end): Observable<User> {
  //   return this.data.collection<User>('users', {
  //     query: {
  //       orderByChild: 'firstName',
  //       limitToFirst: 10,
  //       startAt: start,
  //       endAt: end
  //     }
  //   });
  // }
}
