import { Injectable } from '@angular/core';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { BASE_64 } from '../../utils/constants';
import { Crop } from '@ionic-native/crop';
import { Base64 } from '@ionic-native/base64';

/*
  Generated class for the CameraProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CameraProvider {

  optionsHigh: CameraOptions;
  optionsLow: CameraOptions;
  optionsProfile: CameraOptions;
  optionsGallery: CameraOptions;

  constructor(private camera: Camera, private crop: Crop, private base64: Base64) {
    console.log('Hello CameraProvider Provider');

    // Different detail levels for higher/lower quality
    this.optionsHigh = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false,
      allowEdit: false,
      targetHeight: 1080,
      targetWidth: 1920,
      correctOrientation: true
    };

    this.optionsLow = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false,
      allowEdit: false,
      targetHeight: 480,
      targetWidth: 640,
      correctOrientation: true
    };

    this.optionsProfile = {
      quality: 60,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false,
      allowEdit: false,
      targetHeight: 480,
      targetWidth: 640,
      correctOrientation: true
    };

    this.optionsGallery = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false,
      allowEdit: false,
      targetHeight: 1080,
      targetWidth: 1920,
      correctOrientation: true
    }
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
  async getImageFromGallery() {
    try {
      let imageData = await this.camera.getPicture(this.optionsGallery);
      let newImage: string = await this.crop.crop(imageData, { quality: 100 });
      let base64Image = await this.base64.encodeFile(newImage);
      console.log(base64Image);

      return base64Image;
    } catch (e) {
      throw e;
    }
  }

}
