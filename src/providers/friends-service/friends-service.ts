import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthProvider } from '../auth/auth';
import { User } from '../../models/users/user.interface';
import { FriendRequest } from '../../models/users/friendRequest.interface';
import { Observable } from 'rxjs';
import { UtilitiesProvider } from '../utilities/utilities';
import { UserDataProvider } from '../userData/userData';
import { map } from 'rxjs/operators';

@Injectable()
export class FriendsServiceProvider {

  constructor(private afs: AngularFirestore, private auth: AuthProvider,
    private alertControl: UtilitiesProvider,
    private data: UserDataProvider,
    public toastCtrl: UtilitiesProvider) {
    console.log('Hello FriendsServiceProvider Provider');
  }

  /**
   * gets the list of all users in an array
   *
   * @returns
   * @memberof FriendsServiceProvider
   */
  async getFriendsList() {
    let user = await this.auth.getAuthenticatedUser();

    return this.afs.doc<User>(`users/${user.uid}`)
      .valueChanges().pipe(map(user => {
        return user.friendsList.map(async (userID) => await this.data.getAuthenticatedUserProfileByID(userID))
      }));
  }

  /**
   * returns all pending friends requests in a users collection
   *
   * @returns {Promise<Observable<FriendRequest[]>>}
   * @memberof FriendsServiceProvider
   */
  async getAllFriendRequestsInbox(): Promise<Observable<FriendRequest[]>> {
    let user = await this.auth.getAuthenticatedUser();

    return this.afs.collection<FriendRequest>(`users/${user.uid}/requestsIn`).valueChanges();
  }

  async getAllFriendRequestsOutbox(): Promise<Observable<FriendRequest[]>> {
    let user = await this.auth.getAuthenticatedUser();

    return this.afs.collection<FriendRequest>(`users/${user.uid}/requestsOut`).valueChanges();
  }

  /**
   * accepts the users friend request and deletes the entry from database
   *
   * @param {FriendRequest} request
   * @memberof FriendsServiceProvider
   */
  async onFriendRequestAccept(request: FriendRequest) {
    let receiver: User = await this.data.getAuthenticatedUserProfile();
    let sender: User = await this.data.getAuthenticatedUserProfileByID(request.fromID);

    try {

      // add the friends to the array of friends in profile
      if (!receiver.friendsList)
        receiver.friendsList = new Array(sender.uid);
      else
        receiver.friendsList.push(sender.uid);

      if (!sender.friendsList)
        sender.friendsList = new Array(receiver.uid);
      else
        sender.friendsList.push(receiver.uid);

      // Add users to eachothers friends lists
      await this.afs.doc<User>(`users/${receiver.uid}`).update(receiver);
      await this.afs.doc<User>(`users/${sender.uid}`).update(sender);
      await this.deleteFriendRequest(sender, receiver);
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  }

  /**
   * declines the users friend request and deletes the entry from database
   *
   * @param {FriendRequest} request
   * @memberof FriendsServiceProvider
   */
  async onFriendRequestDecline(request: FriendRequest) {
    let receiver = await this.auth.getAuthenticatedUser();
    let sender = await this.data.getAuthenticatedUserProfileByID(request.fromID);

    try {
      await this.deleteFriendRequest(sender, receiver);
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  }


  /**
   * Removes pending friend requests from the senders and receivers subcollection
   *
   * @param {FriendRequest} request
   * @memberof FriendsServiceProvider
   */
  async deleteFriendRequest(sender: User, receiver: User) {
    await this.afs.doc(`users/${sender.uid}/requestsOut/${receiver.uid}`).delete();
    await this.afs.doc(`users/${receiver.uid}/requestsIn/${sender.uid}`).delete();
    console.log('Friend Requests Deleted');
  }

  async deleteFriend(friend: User, friendsList: User[]) {
    let user: User = await this.data.getAuthenticatedUserProfile();

    // "Deleting" the friend
    user.friendsList.splice(user.friendsList.indexOf(friend.uid), 1);
    friend.friendsList.splice(friend.friendsList.indexOf(user.uid), 1);

    try {
      this.data.updateUserProfile(user);
      this.data.updateUserProfileByID(friend);

      this.toastCtrl.showToast('Friend has been removed');

    } catch (e) {
      console.log(e.message);
      this.toastCtrl.showToast('Error removing friend: ' + e.message);
    }
  }

  /**
   * Attempts to send a friend request to receiver, first checking to ensure receiver does not
   * already have a pending request from the sender.
   *
   * @param {User} receiver
   * @memberof FriendsServiceProvider
   */
  async sendFriendRequestToUser(receiver: User) {
    let sender: User = await this.auth.getAuthenticatedUser();
    let senderProfile = await this.data.getAuthenticatedUserProfile();

    let thisRequest: FriendRequest = {
      fromName: senderProfile.firstName + " " + senderProfile.lastName,
      fromID: sender.uid,
      toID: receiver.uid,
      status: 0
    };

    console.log(JSON.stringify(senderProfile));

    let isFriend: boolean = false;
    let requests$ = this.afs.collection(`users/${receiver.uid}/requestsIn`)
      .valueChanges().subscribe((requests: FriendRequest[]) => {
        requests.forEach(request => {
          if (request.fromID === sender.uid)
            isFriend = true;
        });
      });

    requests$.unsubscribe();

    if (!isFriend) {
      await this.afs.doc<FriendRequest>(`users/${receiver.uid}/requestsIn/${sender.uid}`).set(thisRequest);
      await this.afs.doc<FriendRequest>(`users/${sender.uid}/requestsOut/${receiver.uid}`).set(thisRequest);
      this.alertControl.showToast('Friend request sent!');
    }
    else
      this.alertControl.showToast('Already awaiting a response for pending request.');
  }
}