import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthProvider } from '../auth/auth';
import { User } from '../../models/users/user.interface';
import { FriendRequest } from '../../models/users/friendRequest.interface';
import { NotificationType } from '../../models/users/notifications.interface';

@Injectable()
export class FriendsServiceProvider {

  constructor(private afs: AngularFirestore, private auth: AuthProvider) {
    console.log('Hello FriendsServiceProvider Provider');
  }

  /**
   * Sends friend request to a user and places the request
   *
   * @param {User} receiver
   * @memberof FriendsServiceProvider
   */
  async sendFriendRequestToUser(receiver: User) {
    let sender = await this.auth.getAuthenticatedUser();

    // status is an enum with the following parameters:
    // 0 = pending
    // 1 = accepted
    // 2 = declined
    let request: FriendRequest = { fromID: sender.uid, toID: receiver.uid, status: 0, notification: NotificationType.FriendRequest };

    try {
      // requests sent and requests received as a subcollection for every user?
      await this.afs.doc<FriendRequest>(`users/${receiver.uid}/notificationsRecieved/${sender.uid}`).set(request);
      await this.afs.doc<FriendRequest>(`users/${sender.uid}/notificationsSent/${receiver.uid}`).set(request);
    
    } catch (e) {
      console.log('Error Sending Friend Request with ' + e.message);
      throw e;
    }
  }
}
