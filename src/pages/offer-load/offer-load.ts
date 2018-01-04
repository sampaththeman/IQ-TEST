import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SelectCartProvider}  from '../../providers/select-cart/select-cart';
import {ListPage} from '../../pages/list/list';
import { ObjModel }  from '../../pages/list/item';

/**
 * Generated class for the OfferLoadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-offer-load',
 	templateUrl: 'offer-load.html',
 })
 export class OfferLoadPage {
 	item;
 	public buttonClicked: boolean = false;
 	First :Array<ObjModel> = new  Array <ObjModel>();

 	constructor(public select:SelectCartProvider,public navCtrl: NavController, public navParams: NavParams) {
 		this.item= navParams.data.item;
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad OfferLoadPage');
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

  ionViewWillEnter() {
  	this.CheckButtonClicked();

  }












}
