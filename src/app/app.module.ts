import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FIREBASE_CONFIG } from '../firebase-config/app.firebase.config';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleMaps } from '@ionic-native/google-maps'
import { Camera } from '@ionic-native/camera'
import { Geolocation } from '@ionic-native/geolocation';
import { Crop } from '@ionic-native/crop';
import { Base64 } from '@ionic-native/base64'

// My Providers
import { DataProvider } from '../providers/data/data';
import { UserDataProvider } from '../providers/userData/userData';
import { AuthProvider } from '../providers/auth/auth';
import { NetworkProvider } from '../providers/network/network';
import { MapProvider } from '../providers/map/map';
import { LocationProvider } from '../providers/location/location';
import { MessagesProvider } from '../providers/messages/messages';
import { UtilitiesProvider } from '../providers/utilities/utilities';
import { FriendsProvider } from '../providers/friends/friends';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { CameraProvider } from '../providers/camera-service/camera-service';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DataProvider,
    UserDataProvider,
    AuthProvider,
    NetworkProvider,
    MapProvider,
    LocationProvider,
    MessagesProvider,
    UtilitiesProvider,
    BrowserAnimationsModule,
    GoogleMaps,
    FriendsProvider,
    Camera,
    Geolocation,
    Crop,
    CameraProvider,
    Base64
  ]
})

export class AppModule { }
