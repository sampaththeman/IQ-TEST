import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePopoverPage } from './profile-popover';

@NgModule({
  declarations: [
    ProfilePopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePopoverPage),
  ],
})
export class ProfilePopoverPageModule {}
