import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { UserDataProvider } from '../../providers/userData/userData';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
import { Crop } from '@ionic-native/crop';
import { Camera } from '@ionic-native/camera';
import { CameraProvider } from '../../providers/camera-service/camera-service';
import { ErrorMessages, TOAST_DURATION } from '../../utils/constants';

/**
 * Generated class for the ImagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-images',
  templateUrl: 'images.html',
})
export class ImagesPage {

  base64Image: string;
  imageHolder: string;
  tagList: string[]

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private utilities: UtilitiesProvider,
    private data: UserDataProvider,
    public crop: Crop,
    public toast: ToastController,
    public camera: Camera,
    public cameraSvc: CameraProvider,
    public alert: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImagesPage');
  }

  saveButtonClicked() {
    this.uploadPublicPicture(this.imageHolder);

  }
    /**
   * Gets image from device camera
   *
   * @memberof ProfilePage
   */
  async getImageFromCamera() {
    try {
      this.base64Image = await this.cameraSvc.getImageFromCamera(this.cameraSvc.optionsHigh);
      this.imageHolder = this.base64Image;
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
      this.base64Image = await this.cameraSvc.getImageFromGallery(this.cameraSvc.optionsGallery);
      this.imageHolder = this.base64Image;
    } catch (e) {
      this.utilities.showToast(e.message);
    }
  }

  // async getTagList() {

  // }

  /**
   * Saves image to firebase storage
   *
   * @param {*} image
   * @memberof ProfilePage
   */
  async uploadPublicPicture(image) {
    let tags = ['pretty', 'scenic', 'cat'];    
    
    try {
      await this.cameraSvc.uploadImageToPublicProfile(image, tags);
    } catch (e) {
      this.utilities.showToast(ErrorMessages.UPLOAD_FAILED, TOAST_DURATION);
      this.alert.create({ title: 'Error', subTitle: e.message, buttons: ['OK'] }).present();
    }
  }
}
