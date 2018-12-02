import { Injectable } from '@angular/core';
import { User } from '../../models/users/user.interface';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthProvider } from '../auth/auth';
import { AngularFireStorage } from 'angularfire2/storage'
import { AlertController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { UtilitiesProvider } from '../utilities/utilities';


@Injectable()
export class UserDataProvider {

  constructor(private data: AngularFirestore, private auth: AuthProvider, public storage: AngularFireStorage,
    public alert: AlertController,
    public util: UtilitiesProvider
  ) {
    console.log('Hello UserDataProvider Provider');
  }

  /**
   * Gets the profile of the authenticated user
   * @returns {Promise<User>}
   * @memberof UserDataProvider
   */
  async getAuthenticatedUserProfile(): Promise<User> {

    // get Firebase User
    let user = await this.auth.getAuthenticatedUser();

    return new Promise<User>((resolve, reject) => {

      // get user doc
      let subscription = this.data.doc<User>(`users/${user.uid}`)

        // get user object
        .valueChanges().subscribe((profile: any) => {

          // check if profile exists
          console.log(JSON.stringify(profile));
          if (profile !== undefined && profile.firstName !== null) {

            resolve(profile);
          }
          else
            reject("Profile Does not exist");

          subscription.unsubscribe();
        });
    });
  }

  async getAuthenticatedUserProfileByID(userID: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      // get user doc
      let subscription = this.data.doc<User>(`users/${userID}`)

        // get user object
        .valueChanges().subscribe((profile: any) => {

          // check if profile exists
          console.log(JSON.stringify(profile));
          if (profile !== undefined && profile.firstName !== null) {

            resolve(profile);
          }
          else
            reject("Profile Does not exist");

          subscription.unsubscribe();
        });
    });
  }

  /**
   * Gets the profile in realtime for instant updates
   *
   * @returns {Promise<Observable<User>>}
   * @memberof UserDataProvider
   */
  async getAuthenticatedUserProfileRealTime(): Promise<Observable<User>> {

    // get Firebase User
    let user = await this.auth.getAuthenticatedUser();
    return this.data.doc<User>(`users/${user.uid}`).valueChanges()
  }

  async getAuthenticatedUserProfileRealTimeByID(userID: string): Promise<Observable<User>> {

    // get Firebase User
    return this.data.doc<User>(`users/${userID}`).valueChanges()
  }

  /**
   * Checks if user has a profile
   * @returns {Promise<boolean>}
   * @memberof UserDataProvider
   */
  async profileExists(): Promise<boolean> {

    try {
      await this.getAuthenticatedUserProfile();
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Creates a profile
   * @param {User} profile
   * @memberof UserDataProvider
   */
  async createUserProfile(profile: User) {
    try {
      let user = await this.auth.getAuthenticatedUser();
      
      profile.email = await this.auth.getUserRegisteredEmail();
      profile.uid = await this.auth.getUserUID();
      profile.registerDate = (new Date).getTime();
      profile = this.formatProfileData(profile);

      await this.data.doc<User>(`users/${user.uid}`).set(profile);

    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  /**
   * Updates the profile of the authenticated user
   * @param {User} profile
   * @memberof UserDataProvider
   */
  async updateUserProfile(profile: User) {
    try {
      let user = await this.auth.getAuthenticatedUser();

      profile = this.formatProfileData(profile);

      await this.data.doc<User>(`users/${user.uid}`).update(profile);

    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  /**
   * Uploads an image to storage and references download URL to user profile
   *
   * @param {*} image
   * @memberof UserDataProvider
   */
  async uploadProfileImage(image) {
    let user = await this.auth.getAuthenticatedUser();
    const imageRef = this.storage.ref(`profileImages/${user.uid}/profileImage`); // Make a reference

    try {
      await imageRef.putString(image, 'data_url');
      let profile = await this.getAuthenticatedUserProfile();
      let sub = imageRef.getDownloadURL()
        .subscribe(async (url) => {
          profile.profileImage = url;
          console.log('Updating profile with' + url);
          await this.updateUserProfile(profile);
          sub.unsubscribe();
        });

    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  /**
   * Keeps track of users most recent login timestamp
   *
   * @memberof UserDataProvider
   */
  async updateLastLogin() {
    let profile = await this.getAuthenticatedUserProfile();

    try {
      profile.lastLogin = (new Date).getTime();

      await this.updateUserProfile(profile);
    } catch (e) {
      console.log(e);
    }
  }

  formatProfileData(profile: User): User {
    profile.firstName = this.util.toUpperFirst(profile.firstName);
    profile.lastName = this.util.toUpperFirst(profile.lastName);
    profile.fullName = profile.firstName.toLowerCase() + ' ' + profile.lastName.toLowerCase();
    profile.email = profile.email.toLowerCase();
    profile.userName = profile.userName.toLowerCase();

    profile.caseSensitive = [
      profile.firstName.toLowerCase(),
      profile.lastName.toLowerCase(),
      profile.email.toLowerCase(),
      profile.userName.toLowerCase(),
      profile.firstName.toLowerCase() + ' ' + profile.lastName.toLowerCase()
    ];

    return profile;
  }

}
