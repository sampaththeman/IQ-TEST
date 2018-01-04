import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeSearchPage } from './home-search';

@NgModule({
  declarations: [
    HomeSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeSearchPage),
  ],
})
export class HomeSearchPageModule {}
