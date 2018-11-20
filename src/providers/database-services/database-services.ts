import { Injectable } from '@angular/core';
import {storage, initializeApp} from 'firebase';
import { AlertController } from 'ionic-angular';

var FirebaseConfig = {
    apiKey: "AIzaSyC8eOIjnb_seE8YheOGt__GBWt4Wk0Qd24",
    authDomain: "mapster-ef2ae.firebaseapp.com",
    databaseURL: "https://mapster-ef2ae.firebaseio.com",
    projectId: "mapster-ef2ae",
    storageBucket: "mapster-ef2ae.appspot.com",
    messagingSenderId: "255493036476"
};
/*
  Generated class for the DatabaseServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseServicesProvider {

  constructor(private alertCtrl:AlertController) {
    

  }

  // uploadImage(image: string, folderName: string = "Images"){

  //   if(image != null){
  //     const imageRef = storage().ref(`${folderName}/image_${Date.now()}`); //make a reference 
  //     imageRef.putString(image,'data_url').then((snapshot)=> {
  //       imageRef.getDownloadURL().then(url =>{
  //         console.log("Image Uploaded! URL:"+url);
  //         console.log(snapshot);

  //         let alert = this.alertCtrl.create({
  //           title: 'Done!',
  //           subTitle: 'Image Uploaded.',
  //           buttons: ['OK']
  //         });
  //         alert.present();
          
  //       });
  //     });
  //   }

  // }

  async uploadImage(image: string){

      const imageRef = storage().ref(`CameraImages/image_${Date.now()}`); //make a reference 
      try {
        await imageRef.putString(image,'data_url');
        console.log("Image Uploaded! URL:");
        
      } catch(e) {
        console.log(e);
        throw e;
      }
    

  }

  /*async uploadImage1(image: any, folderName: string = "Images"){

    const imageRef = storage().ref(`${folderName}/image_${Date.now()}`); //make a reference 
    try {
      await imageRef.put(image);
      console.log("Image Uploaded! URL:");
      
    } catch(e) {
      console.log(e);
      throw e;
    }
  

}*/




}
