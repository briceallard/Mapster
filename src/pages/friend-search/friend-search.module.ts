import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FriendSearchPage } from './friend-search';

@NgModule({
  declarations: [
    FriendSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(FriendSearchPage),
  ],
})
export class FriendSearchPageModule {}
