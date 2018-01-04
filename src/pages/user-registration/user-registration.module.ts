import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserRegistrationPage } from './user-registration';

@NgModule({
  declarations: [
    UserRegistrationPage,
  ],
  imports: [
    IonicPageModule.forChild(UserRegistrationPage),
  ],
})
export class UserRegistrationPageModule {}
