import { Injectable } from '@angular/core';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { BASE_64 } from '../../utils/constants';
import { Crop } from '@ionic-native/crop';
import { Base64 } from '@ionic-native/base64';
import { Photo } from '../../models/users/photo.interface';
import { AuthProvider } from '../auth/auth';
import { UserDataProvider } from '../userData/userData';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable()
export class CameraProvider {

  optionsHigh: CameraOptions;
  optionsLow: CameraOptions;
  optionsProfile: CameraOptions;
  optionsGallery: CameraOptions;
  optionsGalleryProfile: CameraOptions;

  constructor(private camera: Camera, private crop: Crop, private base64: Base64,
    private auth: AuthProvider,
    private data: UserDataProvider,
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    console.log('Hello CameraProvider Provider');

    // Different detail levels for higher/lower quality

    // 1080P Resolution
    this.optionsHigh = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false,
      allowEdit: false,
      targetHeight: 1000,
      targetWidth: 1000,
      correctOrientation: true
    };

    // 480P Resolution
    this.optionsLow = {
      quality: 80,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false,
      allowEdit: false,
      targetHeight: 1000,
      targetWidth: 1000,
      correctOrientation: true
    };

    // 480P Resolution, lower quality for small profile images
    this.optionsProfile = {
      quality: 60,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false,
      allowEdit: false,
      targetHeight: 1000,
      targetWidth: 1000,
      correctOrientation: true
    };

    // 1080P from Gallery
    this.optionsGallery = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false,
      allowEdit: false,
      targetHeight: 1000,
      targetWidth: 1000,
      correctOrientation: true
    };

    this.optionsGalleryProfile = {
      quality: 60,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false,
      allowEdit: false,
      targetHeight: 1000,
      targetWidth: 1000,
      correctOrientation: true
    };
  }

  /**
   * Opens Camera and returns the image taken
   *
   * @param {CameraOptions} option
   * @returns
   * @memberof CameraProvider
   */
  async getImageFromCamera(option: CameraOptions) {
    try {
      let imageData: string = await this.camera.getPicture(option);
      let base64Image = BASE_64 + imageData;
      console.log(base64Image);

      return base64Image;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Opens Gallery, Crops selected image, converts to base64 and returns image
   *
   * @returns
   * @memberof CameraProvider
   */
  async getImageFromGallery(option: CameraOptions) {
    try {
      let imageData = await this.camera.getPicture(option);
      let newImage: string = await this.crop.crop(imageData, { quality: 100 });
      let base64Image = await this.base64.encodeFile(newImage);
      console.log(base64Image);

      return base64Image;
    } catch (e) {
      throw e;
    }
  }

    /**
   * Uploads an image to storage and references download URL to user profile
   *
   * @param {*} image
   * @memberof UserDataProvider
   */
  async uploadPhotoInterface(photo: Photo) {
    // let user = await this.auth.getAuthenticatedUser();
    // const imageRef = this.storage.ref(`profileImages/${user.uid}/profileImage`); // Make a reference

    // try {
    //   await imageRef.putString(image, 'data_url');
    //   let profile = await this.data.getAuthenticatedUserProfile();
    //   let sub = imageRef.getDownloadURL()
    //     .subscribe(async (url) => {
    //       profile.profileImage = url;
    //       console.log('Updating profile with' + url);
    //       await this.data.updateUserProfile(profile);
    //       sub.unsubscribe();
    //     });

    // } catch (e) {
    //   console.log(e);
    //   throw e;
    // }
  }
}
