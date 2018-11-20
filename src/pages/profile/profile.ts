import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, normalizeURL } from 'ionic-angular';
import { User } from '../../models/users/user.interface';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
import { LoadingMessages, SuccessMessages, TOAST_DURATION, Pages, ErrorMessages } from '../../utils/constants';
import { UserDataProvider } from '../../providers/userData/userData';

import { ImagePicker } from '@ionic-native/image-picker';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private utilities: UtilitiesProvider, private data: UserDataProvider, 
    public imagePicker: ImagePicker, 
    public crop: Crop,
    public toast: ToastController, 
    public camera: Camera, 
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

  openImagePickerCrop() {
    this.imagePicker.hasReadPermission().then(
      (result) => {
        if (result == false) {
          // no callbacks required as this opens a popup which returns async
          this.imagePicker.requestReadPermission();
        }
        else if (result == true) {
          this.imagePicker.getPictures({
            maximumImagesCount: 1
          }).then(
            (results) => {
              for (var i = 0; i < results.length; i++) {
                this.crop.crop(results[i], { quality: 75 }).then(
                  newImage => {
                    this.uploadImageToFirebase(newImage);
                  },
                  error => console.error("Error cropping image", error)
                );
              }
            }, (err) => console.log(err)
          );
        }
      }, (err) => {
        console.log(err);
      });
  }

  async takePicture() {

    const cameraOptions: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 400,
      //targetHeight: 400,
    }

    let imageData = await this.camera.getPicture(cameraOptions);
    // imageData is either a base64 encoded string or a file URI
    // If it's base64 (DATA_URL):
    let base64Image = 'data:image/jpeg;base64,' + imageData;
    this.imageUrl = base64Image;
    await this.uploadPicture();

  }

  async uploadPicture() {//camera database

    try {
      await this.data.uploadImage(this.imageUrl);

      let toast = this.toast.create({
        message: 'Image was uploaded successfully',
        duration: 3000
      });
      toast.present();
    } catch (e) {
      let toast = this.toast.create({
        message: 'Image failed to upload',
        duration: 3000
      });
      toast.present();
    }

  }
  
  uploadImageToFirebase(image){ //crop firebase
    image = normalizeURL(image);

    //uploads img to firebase storage
    this.data.uploadImage(image)
    .then(photoURL => {
      
      let toast = this.toast.create({
        message: 'Image was uploaded successfully',
        duration: 3000
      });
      toast.present();
      })
  }

}
