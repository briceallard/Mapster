import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController } from 'ionic-angular';
import { TOAST_DURATION } from '../../utils/constants';
import { stringify } from '@angular/core/src/render3/util';

@Injectable()
export class UtilitiesProvider {

  constructor(private toast: ToastController, private loading: LoadingController, private alert: AlertController) {
    console.log('Hello UtilitiesProvider Provider');
  }

  /**
   * Shows a toast
   * @param {string} message
   * @param {*} duration
   * @memberof UtilitiesProvider
   */
  showToast(message: string, duration: number = TOAST_DURATION) {
    this.toast.create({
      message: message,
      duration: duration
    }).present();
  }

  /**
   * Get a loading controller
   * @param {string} message
   * @returns
   * @memberof UtilitiesProvider
   */
  getLoading(message: string) {
    return this.loading.create({
      content: message,
      spinner: 'crescent'
    });
  }

  confirmAlert(title: string, message: string, callback: any) {
    let myAlert = this.alert.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: callback
        }
      ]
    });

    myAlert.present();
  }

  searchFriendFilterAlert(callback: any) {
    let myAlert = this.alert.create({
      title: 'Search',
      message: 'Choose search method ... ',
      inputs: [{
        type: 'radio',
        label: 'Email Address',
        value: 'email',
        checked: true
      },
      {
        type: 'radio',
        label: 'First and Last Name',
        value: 'fullName'
      },
      {
        type: 'radio',
        label: 'Username',
        value: 'userName'
      }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: callback
        }
      ]
    });

    myAlert.present();
  }

  toUpperFirst(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

}
