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

  constructor() {
    console.log('Hello DataProvider Provider');
  }

}
