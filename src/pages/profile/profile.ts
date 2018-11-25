import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, normalizeURL, AlertController } from 'ionic-angular';
import { User } from '../../models/users/user.interface';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
import { LoadingMessages, SuccessMessages, TOAST_DURATION, Pages, ErrorMessages } from '../../utils/constants';
import { UserDataProvider } from '../../providers/userData/userData';

import { Crop } from '@ionic-native/crop';
import { Camera, CameraOptions } from '@ionic-native/camera'


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
  imageUrl: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private utilities: UtilitiesProvider,
    private data: UserDataProvider, 
    public crop: Crop,
    public toast: ToastController, 
    public camera: Camera, 
    public alert: AlertController
    ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.updateProfileMsgs();
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
    this.navCtrl.popAll();

  }

  async updateProfileMsgs() {
    if (await this.data.profileExists()) {
      this.profile = await this.data.getAuthenticatedUserProfile();
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

        loader.dismiss();
        this.utilities.showToast(SuccessMessages.PROFILE, TOAST_DURATION);
        this.navCtrl.setRoot(Pages.HOME_PAGE);

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

        loader.dismiss();
        this.utilities.showToast(SuccessMessages.PROFILE, TOAST_DURATION);
        this.navCtrl.setRoot(Pages.HOME_PAGE);

      } catch (e) {
        loader.dismiss();
        this.utilities.showToast(e, TOAST_DURATION);
      }
    } else {
      this.utilities.showToast(ErrorMessages.EMPTY_FIELDS, TOAST_DURATION);
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

  // async openImagePickerCrop() {

  //   try {

  //     if (!(await this.imagePicker.hasReadPermission())) {
  //       alert("Request permissions");
  //       await this.imagePicker.requestReadPermission();
  //     } else {
  //       let results = await this.imagePicker.getPictures({ maximumImagesCount: 1 });
  //       alert("After permissions");
  //       for (var i = 0; i < results.length; i++) {
  //         let newImage = await this.crop.crop(results[i], { quality: 100 });
  //         console.log(newImage);
  //         let file = new File([""], normalizeURL(newImage));
  //         await this.uploadImageToFirebase(newImage);
  //       }
  //     }
  //   } catch (e) {
  //     alert("You fucked up!");
  //     this.alert.create({ title: 'Error!', subTitle: e, buttons: ['OK'] }).present();
  //   }

  // }

  async takePicture() {

    const cameraOptions: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }

    let imageData = await this.camera.getPicture(cameraOptions);
    await this.uploadPicture(imageData);

  }

  async uploadPicture(image) {

    let loader = this.utilities.getLoading(LoadingMessages.IMAGE);

    try {

      loader.present();
      
      await this.data.uploadProfileImage(image);
      this.utilities.showToast(SuccessMessages.IMAGE, TOAST_DURATION);

      loader.dismiss();

    } catch (e) {
      loader.dismiss();
      this.utilities.showToast(ErrorMessages.UPLOAD_FAILED, TOAST_DURATION);
      this.alert.create({ title: 'Error', subTitle: e.message, buttons: ['OK'] }).present();
    }

  }
  
  async uploadImageToFirebase(image){ //crop firebase
    image = normalizeURL(image);

    //uploads img to firebase storage
    this.data.uploadProfileImage(image)
    .then(photoURL => {
      
      let toast = this.toast.create({
        message: 'Image was uploaded successfully',
        duration: 3000
      });
      toast.present();
      })
  }

}
