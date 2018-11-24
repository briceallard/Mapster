import { Injectable } from '@angular/core';
import { User } from '../../models/users/user.interface';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthProvider } from '../auth/auth';
import { initializeApp } from 'firebase';
import { AngularFireStorage } from 'angularfire2/storage'
import { AlertController } from 'ionic-angular';


@Injectable()
export class UserDataProvider {

  constructor(private data: AngularFirestore, private auth: AuthProvider, public storage: AngularFireStorage, public alert: AlertController) {
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
          console.log(profile);
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
      await this.data.doc<User>(`users/${user.uid}`).update(profile);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async uploadProfileImage(image) {
    let user = await this.auth.getAuthenticatedUser();
    let imageFile = new File([""], image);
    const imageRef = this.storage.ref(`profileImages/${user.uid}/profileImage`); // Make a reference

    let metadata = {
      contentType: 'image/jpeg'
    };

    try {
      await imageRef.put(imageFile, metadata);
      let URL = await imageRef.getDownloadURL();
      console.log("Image Saved! URL:" + URL);

    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getProfilImageURL() {
    let user = await this.auth.getAuthenticatedUser();
    return this.storage.storage.ref().child(`profileImages/${user.uid}/profileImage`).getDownloadURL();
  }

}
