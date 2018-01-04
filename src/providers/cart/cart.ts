import { Component,Input,OnInit,Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Platform } from 'ionic-angular';
import { Http,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {HomePage} from '../../pages/home/home';
import {CartDataModel} from '../../pages/about/cart_Data_Model';
import * as $ from 'jquery';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';


/*
  Generated class for the CartProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
  */
  @Injectable()
  export class CartProvider {
    public ShopItems2: any;
    Items:any = [];
    Clicked:any=[];

    showEmptyCartMessage: boolean = false;
    //Cart Array Definition 
    CartDataArray :Array<CartDataModel> = new  Array <CartDataModel>();

    CartBadgeCount : number = 0; // default 0


    constructor(public loading:LoadingController,private http:Http,private platform:Platform,public storage: Storage) {
      // console.log('ShowEm',this.CartDataArray);
    }




    
    // public getItems()
    // {

    //   var base_url = "http://snap.iqmedialabs.com/";
    //   if(localStorage.getItem("ShopItems2") === null){
    //     this.http.get(base_url+'itemlist').map(res => res.json()).subscribe(data => {
    //       let items = data;
    //       this.ShopItems2=data;
    //       localStorage["ShopItems2"] = JSON.stringify(data);
    //     },
    //     err => {
    //       console.log('error in Json');

    //     });

    //   }else{
    //     this.ShopItems2 = JSON.parse(localStorage.getItem("ShopItems2"));  
    //   }
    // }


    //load item list 


   load() {
    if (this.ShopItems2) {
            // already loaded data
            return Promise.resolve(this.ShopItems2);
          }

        // don't have the data yet
        return new Promise(resolve => {

          var base_url="http://snap.iqmedialabs.com/itemlist";

          let loading = this.loading.create({
            content: 'Please wait...',
            spinner: 'crescent'
          });
          loading.present();

          this.http.get(base_url).map(res => res.json()).subscribe(data => {
            let items = data;
            this.ShopItems2 = data;
            resolve(this.ShopItems2);
            

            this.storage.set('Item_List',JSON.stringify(this.ShopItems2));
            loading.dismiss();
          },
          err => {
            console.log('error in Json');

          });
          
        });
      }


    //add items to cart 
    setCartItems(item:any){
      if(!this.checkItem(item)){

        this.CartDataArray.push( new CartDataModel(item));
        this.incrementBadgeCount();
        localStorage["Cart"] = JSON.stringify(this.CartDataArray);

      }
    }

    //remove items from cart 
    setRemoveItems(item:any){
      if(this.checkItem(item) === true ){
        this.CartDataArray = this.CartDataArray.filter(obj => obj.id !== item.group_id);

        this.decrementBadgeCount();
        localStorage["Cart"] = JSON.stringify(this.CartDataArray);
        this.onCancelClick(item);

      }
    }


    //decrement items
    setDecrement(item: any){
      if(item.group_items[0].qty > 0) {
        item.group_items[0].qty--;
      }
      ;   
    }

    //increment items
    setIncrement(item: any){
      item.group_items[0].qty++;   
    }   


    //increment badge count
    incrementBadgeCount(){
      this.CartBadgeCount = this.CartBadgeCount+1;
    }

    //decrement badge count 
    decrementBadgeCount(){
      this.CartBadgeCount = this.CartBadgeCount-1;
    }


    //checking items
    checkItem(item){
      var isAvailable =false;
      for(var i = 0; i < this.CartDataArray.length; i++) {
        if(this.CartDataArray[i].id === item.group_id){
          isAvailable=true;
          break;
        }
      }
      return isAvailable;
    }


    //Items Array 
    ActivateItems(items){
      if(items.group_items[0].qty !=0){
        var i = this.Items.indexOf(items);
        if (i > -1) {

        } else {
          this.Items.push(items);
          items.selected = true;
        }
      }else{

      }
    }

    DeactivateItems(items){
      if(items.group_items[0].qty !=0){
        var i = this.Items.indexOf(items);
        if (i > -1) {
          this.Items.splice(i, 1);
          items.selected = false;

        } else {

        }
      }else{

      }
    }



    //Onbutton click
    onButtonClick(item){
      if(item.group_items[0].qty !=0){
        var i = this.Clicked.indexOf(item);
        if(i>-1){

        }else{
          this.Clicked.push(item);
          item.Checked = true;

        }

      }else{

      }   
    }



    onCancelClick(item){

      for(var i = 0; i < this.Clicked.length; i++) {
        if(this.Clicked[i].group_id === item.id){
          this.Clicked = this.Clicked.filter(obj => obj.group_id !== item.id);
          break;
        }

      }


    }









  }








  
