import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import {FIREBASE_CONFIG} from "../../firebase-config/app.firebase.config";
import * as firebase from 'firebase/app';
import 'firebase/storage';
import {storage} from 'firebase';
import { ToastController } from 'ionic-angular';
import { TOAST_DURATION } from '../../utils/constants';
@Injectable()
export class FirebaseService {

  constructor(public toastCtrl: ToastController){}

  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux:any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  };

  uploadImage(imageURI){
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storage().ref(`CameraImages/image_${Date.now()}`);
      this.encodeImageUri(imageURI, function(image64){
        imageRef.putString(image64, 'data_url')
        .then(snapshot => {
          resolve(snapshot.downloadURL)
        }, err => {
          reject(err);
        })
      })
    })
  }



}
