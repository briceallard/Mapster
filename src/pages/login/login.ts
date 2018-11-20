import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Account } from '../../models/registration/account.interface';
import { AuthProvider } from '../../providers/auth/auth';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
import { TOAST_DURATION, Pages, LoadingMessages, ErrorMessages } from '../../utils/constants';
import { UserDataProvider } from '../../providers/userData/userData';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  account = {} as Account;

  constructor(public navCtrl: NavController, private auth: AuthProvider, private utilities: UtilitiesProvider, private userData: UserDataProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async login() {

    let loader = this.utilities.getLoading(LoadingMessages.LOGIN);

    // check for empty fields
    if (this.validate()) {

      try {

        loader.present();

        await this.auth.loginWithEmailAndPassword(this.account);

        if (await this.userData.profileExists()) {
          loader.dismiss();
          this.navCtrl.setRoot(Pages.HOME_PAGE)
        } else {
          loader.dismiss();
          this.navCtrl.setRoot(Pages.PROFILE_PAGE)
        }

      } catch (e) {
        loader.dismiss();
        this.utilities.showToast(e, TOAST_DURATION);
      }

    } else {
      this.utilities.showToast(ErrorMessages.EMPTY_FIELDS, TOAST_DURATION);
    }

  }

  register() {
    this.navCtrl.push(Pages.REGISTER_PAGE);
  }

  validate() {
    return this.account.email !== null && this.account.email !== ''
      && this.account.password !== null && this.account.password !== '';
  }

}
