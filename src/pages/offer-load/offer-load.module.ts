import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfferLoadPage } from './offer-load';

@NgModule({
  declarations: [
    OfferLoadPage,
  ],
  imports: [
    IonicPageModule.forChild(OfferLoadPage),
  ],
})
export class OfferLoadPageModule {}
