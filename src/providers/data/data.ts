import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

import * as firebase from 'firebase/app';
import { AuthProvider } from '../auth/auth';
import { AngularFireStorage } from 'angularfire2/storage';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  constructor(private firestore: AngularFirestore, private auth: AuthProvider, public storage: AngularFireStorage) {
    console.log('Hello DataProvider Provider');
  }

  // encodeImageUri(imageUri, callback) {
  //   var c = document.createElement('canvas');
  //   var ctx = c.getContext("2d");
  //   var img = new Image();
  //   img.onload = function () {
  //     var aux:any = this;
  //     c.width = aux.width;
  //     c.height = aux.height;
  //     ctx.drawImage(img, 0, 0);
  //     var dataURL = c.toDataURL("image/jpeg");
  //     callback(dataURL);
  //   };
  //   img.src = imageUri;
  // };

  // uploadImage(imageURI){
  //   let user = this.auth.getAuthenticatedUser();

  //   return new Promise<any>((resolve, reject) => {

  //     let storageRef = firebase.storage().ref();
  //     let imageRef = storage().ref(`users/${user.uid}/publicImages/image_${Date.now()}`);
  //     this.encodeImageUri(imageURI, function(image64){
  //       imageRef.putString(image64, 'data_url')
  //       .then(snapshot => {
  //         resolve(snapshot.downloadURL)
  //       }, err => {
  //         reject(err);
  //       })
  //     })
  //   })
  // }

  // uploadImage(imageURI){
  //   return new Promise<any>((resolve, reject) => {
  //     let storageRef = firebase.storage().ref();
  //     let imageRef = this.storage.ref(`CameraImages/image_${Date.now()}`);
  //     this.encodeImageUri(imageURI, function(image64){
  //       imageRef.putString(image64, 'data_url')
  //       .then(snapshot => {
  //         resolve(snapshot.downloadURL)
  //       }, err => {
  //         reject(err);
  //       })
  //     })
  //   })
  // }

}
