import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UserDataProvider } from '../../providers/userData/userData';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
import { Crop } from '@ionic-native/crop';
import { Camera } from '@ionic-native/camera';
import { CameraProvider } from '../../providers/camera-service/camera-service';
import { ErrorMessages, TOAST_DURATION } from '../../utils/constants';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Photo } from '../../models/users/photo.interface';
import { User } from '../../models/users/user.interface';


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

  public images: Photo[] = [];
  public galleryType: string;
  base64Image: string;
  imageHolder: string;
  tagList: string[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private utilities: UtilitiesProvider,
    private data: UserDataProvider,
    public crop: Crop,
    public toast: ToastController,
    public camera: Camera,
    public cameraSvc: CameraProvider,
    private auth: AuthProvider,
    public afs: AngularFirestore,
    public alertCtrl: UtilitiesProvider) {
  }

  ionViewWillLoad() {
    this.getAllUserImages();
    this.galleryType = 'view';
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImagesPage');
  }

  saveButtonClicked() {
    this.uploadPublicPicture(this.imageHolder);
  }

  onSegmentChange() {
    if(this.galleryType === 'view')
      this.getAllUserImages();
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

  async getAllUserImages() {
    let user: User = await this.data.getAuthenticatedUserProfile();

    this.images = user.publicImages
    console.log(JSON.stringify(this.images));
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
      await this.getAllUserImages();
      
      this.alertCtrl.showToast('Image uploaded successfully');

    } catch (e) {
      this.utilities.showToast(ErrorMessages.UPLOAD_FAILED, TOAST_DURATION);
      this.alertCtrl.showToast('Error uploading image');
    }
  }
}
