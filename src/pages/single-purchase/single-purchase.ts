import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SelectCartProvider}  from '../../providers/select-cart/select-cart';
import {ListPage} from '../../pages/list/list';
import { ObjModel }  from '../../pages/list/item';


/**
 * Generated class for the SinglePurchasePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-single-purchase',
  templateUrl: 'single-purchase.html',
})
export class SinglePurchasePage {

  item;
  First :Array<ObjModel> = new  Array <ObjModel>();
  public buttonClicked: boolean = false;

  constructor(public select:SelectCartProvider, public navCtrl: NavController, public navParams: NavParams) {
   this.item = this.navParams.data.item;
   console.log('V',this.item);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SinglePurchasePage');
  }

  setDecrement(item: any){
     if(item.qty > 0) {
       item.qty--;
     } 
   }

  //increment items
  setIncrement(item: any){
    item.qty++;   
  }  

  CheckButtonClicked(){

    if (this.select.SelectArray.length>0) {
      this.buttonClicked=true;
    }else{
      this.buttonClicked =false;
    }


  } 


  notify(event,item)
  {
    if(item.qty != 0){
      this.select.notify(event,item);
      this.CheckButtonClicked();
      this.First.push(new ObjModel(item));
    }
  }

  navigateTolistPage(){
    this.navCtrl.push(ListPage);
  }




}
