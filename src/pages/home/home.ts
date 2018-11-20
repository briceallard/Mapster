import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, normalizeURL, ToastController, AlertController } from 'ionic-angular';
import { TOAST_DURATION, Pages, LoadingMessages, ErrorMessages } from '../../utils/constants';

import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FirebaseService } from '../service/firebase.service';
import { DatabaseServicesProvider } from '../../providers/database-services/database-services';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public imageUrl: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modal: ModalController,
    public imagePicker: ImagePicker,
    public cropService: Crop,
    public toastCtrl: ToastController,
    public firebaseService: FirebaseService,
    public camera: Camera,
    private db: DatabaseServicesProvider,
    private alertCtrl: AlertController

  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  public openProfileModal() {
    let profileModal = this.modal.create(Pages.MODAL_PROFILE);
    profileModal.present();
  }

  public closeModal() {

  }
  openImagePickerCrop(){
    this.imagePicker.hasReadPermission().then(
      (result) => {
        if(result == false){
          // no callbacks required as this opens a popup which returns async
          this.imagePicker.requestReadPermission();
        }
        else if(result == true){
          this.imagePicker.getPictures({
            maximumImagesCount: 1
          }).then(
            (results) => {
              for (var i = 0; i < results.length; i++) {
                this.cropService.crop(results[i], {quality: 75}).then(
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
  

  /*async openImagePickerCrop() {
    try {
      if (!(await this.imagePicker.hasReadPermission())) {
        // no callbacks required as this opens a popup which returns async
        await this.imagePicker.requestReadPermission();
      }
      else {
        let results = await this.imagePicker.getPictures({ maximumImagesCount: 1 });
        for (var i = 0; i < results.length; i++) {
          let newImage = await this.cropService.crop(results[i], { quality: 75 });
          console.log(newImage);
          //let file = new File([""], normalizeURL(newImage));
          await this.db.uploadImage1(newImage, "CameraImages");
         
        }
      }
    } catch (e) {
      this.alertCtrl.create({ title: 'Error!', subTitle: 'Image Not Uploaded.', buttons: ['OK'] }).present();
    }


  }*/

  async takePicture() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 400,
      //targetHeight: 400,
    }

    let imageData = await this.camera.getPicture(options);
    // imageData is either a base64 encoded string or a file URI
    // If it's base64 (DATA_URL):
    let base64Image = 'data:image/jpeg;base64,' + imageData;
    this.imageUrl = base64Image;
    await this.uploadPicture();



  }


  async uploadPicture() {//camera database

    try {
      await this.db.uploadImage(this.imageUrl,);

      let toast = this.toastCtrl.create({
        message: 'Image was uploaded successfully',
        duration: 3000
      });
      toast.present();
    } catch (e) {
      let toast = this.toastCtrl.create({
        message: 'Image failed to upload',
        duration: 3000
      });
      toast.present();
    }

  }
  uploadImageToFirebase(image){ //crop firebase
    image = normalizeURL(image);

    //uploads img to firebase storage
    this.firebaseService.uploadImage(image)
    .then(photoURL => {
      
      let toast = this.toastCtrl.create({
        message: 'Image was uploaded successfully',
        duration: 3000
      });
      toast.present();
      })
  }


  /*shareImage(){

    this.socialSharing.shareViaInstagram( "This is the message!",this.imageUrl ).then(() => {
      console.log("Image Shared!");
    }).catch(() => {
      // Error!
    });
    
  }*/
}

