import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController, App } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Pages } from '../../utils/constants';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
import { Subscription } from 'rxjs';

/**
 * Generated class for the PopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {

  friends$: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modal: ModalController,
    public auth: AuthProvider,
    public util: UtilitiesProvider,
    private view: ViewController,
    public app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalProfilePage');
  }

  friendsClicked() {
    this.view.dismiss().then(() => {
      this.app.getRootNav().push(Pages.FRIENDS_PAGE);
    });
  }

  profileClicked() {
    this.view.dismiss().then(() => {
      this.app.getRootNav().push(Pages.PROFILE_PAGE);
    });
  }

  logoutConfirm() {
    
    this.util.confirmAlert('Logout', 'Are you sure?', async () => {
      await this.auth.logout();
      
      this.view.dismiss().then(() => {
        this.app.getActiveNav().setRoot(Pages.LOGIN_PAGE);
      });
    });
  }
}
