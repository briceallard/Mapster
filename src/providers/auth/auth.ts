import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Account } from '../../models/registration/account.interface';
import { User } from 'firebase';

@Injectable()
export class AuthProvider {

  constructor(private auth: AngularFireAuth) {}

  /**
   * Create an account with an email and a password
   * @param {Account} account
   * @memberof AuthProvider
   */
  async createUserWithEmailAndPassword(account: Account) {
    try {
      await this.auth.auth.createUserWithEmailAndPassword(account.email, account.password);
      // TODO: call sendEmailVerificationLink() 
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  }

  /**
   * Login with an email and a password
   * @param {Account} account
   * @memberof AuthProvider
   */
  async loginWithEmailAndPassword(account: Account) {
    try {
      console.log(await this.auth.auth.signInWithEmailAndPassword(account.email, account.password));

      // let emailVerified = await this.isEmailVerified();
      // if (!emailVerified)
        // throw new Error('Email is not verified');

    } catch (e) {
      console.log(e.message);
      throw e;
    }
  }

  /**
   * Send email verification link
   * @memberof AuthProvider
   */
  async sendEmailVerificationLink() {
    try {
      let user: User = await this.getAuthenticatedUser();
      await user.sendEmailVerification();
    } catch(e) {
      console.log(e);
      throw e;
    }
  }

  /**
   * Check if user is authenticated
   * @returns {Promise<boolean>}
   * @memberof AuthProvider
   */
  isAuthenticated(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.auth.authState.subscribe((auth) => {
        if (auth) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  /**
   * Check if email is verified
   * @private
   * @returns
   * @memberof AuthProvider
   */
  private async isEmailVerified() {
    let user: User = await this.getAuthenticatedUser();
    return user.emailVerified;
  }

  /**
   * Get the firebase profile of the authenticated user
   * @returns {Promise<any>}
   * @memberof AuthProvider
   */
  getAuthenticatedUser(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let subscription = this.auth.user.subscribe((user) => {
        console.log(user);
        resolve(user);
        subscription.unsubscribe();
      });
    });
  }

  /**
   * Logout
   * @memberof AuthProvider
   */
  async logout() {
    await this.auth.auth.signOut();
  }

}
