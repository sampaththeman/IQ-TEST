import { Component } from '@angular/core';
import { Http,Response } from '@angular/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SelectCartProvider}  from '../../providers/select-cart/select-cart';
import { ObjModel }  from '../../pages/list/item';
import {ListPage}  from '../../pages/list/list';
import { Storage } from '@ionic/storage';
import { Keyboard } from '@ionic-native/keyboard';
import { SegmentFilterPipe } from '../../pipes/segment-filter/segment-filter';


/**
 * Generated class for the HomeSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
   selector: 'page-home-search',
   templateUrl: 'home-search.html',
 })
 export class HomeSearchPage {

    public ShopItems2 = [];
    public Categories:any;
     public keys:any;
     Items:any = [];
     Clicked:any=[];
     public buttonClicked: boolean = false;

  ITEM: string = ""; // initializing item Segments

  First :Array<ObjModel> = new  Array <ObjModel>();

     constructor(private keyboard: Keyboard,public select:SelectCartProvider,public storage:Storage,public http:Http,public navCtrl: NavController, public navParams: NavParams) {
         this.storage.ready()
         .then(() => this.getKeys())
         .then(() => this.onToggleSelected())
         .then(() => this.Categories=this.ShopItems2)
         .then(()=>this.ITEM = navParams.data.item)
         this.keyboard.close();


     }

     ionViewDidLoad() {
         console.log('ionViewDidLoad HomeSearchPage');
     }

     ionViewWillEnter() {

         this.storage.ready()
         .then(() => this.getKeys())
         .then(() => this.onToggleSelected())
         .then(()=> this.loadAvatar())
         .then(() => this.CheckButtonClicked()) 
     }

     loadAvatar(){
       if(this.ITEM != null){
         console.log('item',this.ITEM);
         this.Categories=SegmentFilterPipe.prototype.transform(this.ShopItems2,this.ITEM)
       }else{
         this.Categories = this.ShopItems2; 
         console.log('item',this.Categories);
       }
      
     }


     initializeItems() {
         this.ShopItems2;
     }

     CheckButtonClicked(){

         if (this.select.SelectArray.length>0) {
             this.buttonClicked=true;
         }else{
             this.buttonClicked =false;
         }


     }




     private async getKeys(){
         this.ShopItems2=[];
         this.keys = await  this.storage.get('Item_List').then((val) => {
             let value = JSON.parse(val);
             this.ShopItems2=(value);
         });
     }





     getItems1(ev: any) {
         this.initializeItems()
         let val = ev.target.value;

         if (val && val.trim() != '') {  

             this.Categories = this.Categories.filter((item) => {
                 return (item.itmname.toLowerCase().indexOf(val.toLowerCase()) > -1);
             })  

         }
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



  ionViewDidLeave () {
    this.Categories=this.ShopItems2;
    console.log( 'view did leave' );
  }




     //
     onToggleSelected() {

         this.ShopItems2.forEach((i) => {
             {i.selected=false;}
             {i.Checked =false;}
             {i.qty=1}
         });

         this.Items.length=0;
         this.Clicked.length=0;
     }

 }