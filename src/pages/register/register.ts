import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Account } from '../../models/registration/account.interface';
import { AuthProvider } from '../../providers/auth/auth';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
import { TOAST_DURATION, LoadingMessages, ErrorMessages, SuccessMessages } from '../../utils/constants';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  account = {} as Account;
  password: string;

  constructor(public navCtrl: NavController, private auth: AuthProvider, private utilities: UtilitiesProvider) {
    this.account.email = this.account.password = this.password = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  async register() {

    let loader = this.utilities.getLoading(LoadingMessages.LOGIN);

    // check for empty fields
    if (this.validate()) {

      // check if passwords match
      if (this.validatePassword()) {
        try {

          loader.present();

          // create account
          await this.auth.createUserWithEmailAndPassword(this.account);
        
          loader.dismiss();
          this.utilities.showToast(SuccessMessages.REGISTER, TOAST_DURATION);
          this.navCtrl.pop();

        } catch (e) {
          loader.dismiss();
          this.utilities.showToast(e, TOAST_DURATION);
        }

      } else {  // passwords do not match
        this.utilities.showToast(ErrorMessages.PASSWORD_MISMATCH, TOAST_DURATION);
      }

    } else {  // empty fields
      this.utilities.showToast(ErrorMessages.EMPTY_FIELDS, TOAST_DURATION);
    }
  }

  validate() {
    return this.account.email !== '' && this.account.password !== '' && this.account.password !== '';
  }

  validatePassword() {
    return this.account.password === this.password;
  }

}
