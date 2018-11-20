import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewMessagePage } from '../new-message/new-message';
import { Pages } from '../../utils/constants';

/**
 * Generated class for the MessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesPage');
  }

  //navigate to newMessagePage
  newMessageClick() 
  {
    this.navCtrl.push(Pages.NEW_MESSAGE_PAGE); //page for drafting a new message
  }

  //TODO: Click on users to view conversations with them
  //TODO: Search for users
}
