import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController } from 'ionic-angular';

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
  showToast(message: string, duration) {
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
    let myAlert =  this.alert.create({
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

}
