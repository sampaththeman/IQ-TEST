import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SinglePurchasePage } from './single-purchase';

@NgModule({
  declarations: [
    SinglePurchasePage,
  ],
  imports: [
    IonicPageModule.forChild(SinglePurchasePage),
  ],
})
export class SinglePurchasePageModule {}
