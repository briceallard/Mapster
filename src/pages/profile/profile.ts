import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, normalizeURL, AlertController } from 'ionic-angular';
import { User } from '../../models/users/user.interface';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
import { LoadingMessages, SuccessMessages, TOAST_DURATION, Pages, ErrorMessages, BASE_64 } from '../../utils/constants';
import { UserDataProvider } from '../../providers/userData/userData';

import { Crop } from '@ionic-native/crop';
import { Camera, CameraOptions } from '@ionic-native/camera'
import { Subscription } from 'rxjs';
import { CameraProvider } from '../../providers/camera-service/camera-service';


/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profile = {} as User;
  base64Image: string;
  profile$: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private utilities: UtilitiesProvider,
    private data: UserDataProvider,
    public crop: Crop,
    public toast: ToastController,
    public camera: Camera,
    public cameraSvc: CameraProvider,
    public alert: AlertController
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  ionViewWillLoad() {
    this.updateProfileMsgs();
  }

  ionViewWillLeave() {
    if (this.profile$)
      this.profile$.unsubscribe();
  }

  /**
   * Checks if user profile exists and either creates new or updates user.Profile
   *
   * @memberof ProfilePage
   */
  async saveProfile() {

    if (await this.data.profileExists()) {
      await this.saveExistingProfile();
    } else {
      await this.saveNewProfile();
    }

    this.navCtrl.setRoot(Pages.HOME_PAGE);
  }

  async updateProfileMsgs() {
    if (await this.data.profileExists()) {
      this.profile$ = (await this.data.getAuthenticatedUserProfileRealTime())
        .subscribe((profile) => this.profile = profile);
    }
  }

  /**
   * If user profile exists, updates and replaces existing data in user.Profile
   *
   * @memberof ProfilePage
   */
  async saveExistingProfile() {

    let loader = this.utilities.getLoading(LoadingMessages.PROFILE);

    if (this.validate()) {
      try {

        loader.present();

        await this.data.updateUserProfile(this.profile);

        if (this.base64Image) {
          this.uploadPicture(this.base64Image);
        }

        loader.dismiss();
        this.utilities.showToast(SuccessMessages.PROFILE, TOAST_DURATION);
        this.navCtrl.pop();

      } catch (e) {
        loader.dismiss();
        this.utilities.showToast(e, TOAST_DURATION);
      }
    } else {
      this.utilities.showToast(ErrorMessages.EMPTY_FIELDS, TOAST_DURATION);
    }
  }

  /**
   * If user profile does not exists, creates and saves it
   *
   * @memberof ProfilePage
   */
  async saveNewProfile() {

    let loader = this.utilities.getLoading(LoadingMessages.PROFILE);

    if (this.validate()) {
      try {

        loader.present();

        await this.data.createUserProfile(this.profile);

        if (this.base64Image) {
          this.uploadPicture(this.base64Image);
        }

        loader.dismiss();
        this.utilities.showToast(SuccessMessages.PROFILE, TOAST_DURATION);
        this.navCtrl.pop();

      } catch (e) {
        loader.dismiss();
        this.utilities.showToast(e, TOAST_DURATION);
      }
    } else {
      this.utilities.showToast(ErrorMessages.EMPTY_FIELDS, TOAST_DURATION);
    }
  }

  /**
   * Gets image from device camera
   *
   * @memberof ProfilePage
   */
  async getImageFromCamera() {
    try {
      this.base64Image = await this.cameraSvc.getImageFromCamera(this.cameraSvc.optionsProfile);
      //await this.uploadPicture(this.base64Image);
    } catch (e) {
      this.utilities.showToast(e.message);
    }
  }

  /**
   * Gets image from device gallery
   *
   * @memberof ProfilePage
   */
  async getImageFromGallery() {
    try {
      this.base64Image = await this.cameraSvc.getImageFromGallery();
      //await this.uploadPicture(this.base64Image);
    } catch (e) {
      this.utilities.showToast(e.message);
    }
  }

  /**
   * Saves image to firebase storage
   *
   * @param {*} image
   * @memberof ProfilePage
   */
  async uploadPicture(image) {
    try {
      await this.data.uploadProfileImage(image);
    } catch (e) {
      this.utilities.showToast(ErrorMessages.UPLOAD_FAILED, TOAST_DURATION);
      this.alert.create({ title: 'Error', subTitle: e.message, buttons: ['OK'] }).present();
    }
  }

  /**
   * Checks for empty fields
   *
   * @returns
   * @memberof ProfilePage
   */
  validate() {
    return this.profile.firstName !== '' && this.profile.lastName !== '' && this.profile.userName !== '' && this.profile.email !== '';
  }

}
