import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from '../../models/users/user.interface';
import { Observable } from 'rxjs';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Platform } from 'ionic-angular';
import { FirebaseApp } from 'angularfire2';
import { Firebase } from '@ionic-native/firebase';

/*
  Generated class for the FriendsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FriendsProvider {

  constructor(public data: AngularFirestore, 
              public firebaseNative: Firebase,
              private push: Push,
              private platform: Platform) {
    console.log('Hello FriendsProvider Provider');
    this.pushSetup();
  }

  pushSetup()
  {
    // to initialize push notifications

    const options: PushOptions = {
      android: {},
      ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
      },
      windows: {},
      browser: {
          pushServiceURL: 'http://push.api.phonegap.com/v1/push'
      }
    };

    const pushObject: PushObject = this.push.init(options);


    pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

    pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }


  //following code from "Ionic Native Push Notifications + Firebase Cloud Messaging" https://www.youtube.com/watch?v=SOOjamH1bAA 

  //asks user for permission to send notifications
  async getToken(){
    let token;

    if(this.platform.is('android')){
      token = await this.firebaseNative.getToken();
    }

    if(this.platform.is('ios')){
      token = await this.firebaseNative.getToken();
      await this.firebaseNative.grantPermission(); // pop up modal requesting permission
    }

    return this.saveTokenToFirestore(token)
  }

  private saveTokenToFirestore(token) {
    if(!token) return; //user did not grant permission
    const devicesRef = this.data.collection('devices')

    const docData = {
      token,
      userId: 'testUser', //this should be the user's authentication id 
    }

    return devicesRef.doc(token).set(docData)
  }

  listenToNotifications(){
    return this.firebaseNative.onNotificationOpen();
  }

  // getUsers(start, end): Observable<User> {
  //   return this.data.collection<User>('users', {
  //     query: {
  //       orderByChild: 'firstName',
  //       limitToFirst: 10,
  //       startAt: start,
  //       endAt: end
  //     }
  //   });
  // }
}
