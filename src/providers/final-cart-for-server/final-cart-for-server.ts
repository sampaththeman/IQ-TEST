import { Injectable } from '@angular/core';
import { ToastController }  from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { CartForServerModel }  from '../../pages/details/CartForServer';
/*
  Generated class for the FinalCartForServerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
  */
  @Injectable()
  export class FinalCartForServerProvider {

    //Final Array For Server
    FinalArrayForServer : Array<CartForServerModel> = new Array <CartForServerModel>();
    // default 0
    CartBadgeCount : number = 0; 
    stringArr = [];
  


    constructor(public http: Http,public Toast:ToastController) {
      console.log('Hello FinalCartForServerProvider Provider');
    }

 



    //add items to cart 
    setCartItems(item:any){
      if(!this.checkItem(item) && item.qty !=0){
        this.FinalArrayForServer.push( new CartForServerModel(item,item));       
        this.incrementBadgeCount();
        this.presentToast();
      }
      console.log('badge count',this.CartBadgeCount);
    }


    setCartItemsSingle(item:any){     
      console.log('itemSetcat',item);
      if(!this.checkItemSingle(item)){
        this.FinalArrayForServer.push( new CartForServerModel(item.group_id,item.group_items));  
    console.log('set cart',this.FinalArrayForServer);
        this.incrementBadgeCount();
        this.presentToast();
      }
      console.log('badge count',this.CartBadgeCount);
    }


    presentToast() {
      let toast = this.Toast.create({
        message: 'successfully added to your cart',
        duration: 3000,
        position: 'top'
      });

      toast.onDidDismiss(() => {
        // console.log('Dismissed toast');
      });

      toast.present();
    }


 

    //Increment Badge count
    incrementBadgeCount(){
      this.CartBadgeCount = this.CartBadgeCount+1;
    }

    //decrement badge count 
    decrementBadgeCount(){
      if(this.CartBadgeCount !=0 ){
        this.CartBadgeCount = this.CartBadgeCount-1;
      }
    }

    //checking items
    checkItem(item){
      var isAvailable =false;
      for(var i = 0; i < this.FinalArrayForServer.length; i++) {
        console.log('Check',this.FinalArrayForServer[i]);
        if(this.FinalArrayForServer[i].group_items === item){
          isAvailable=true;
          break;
        }
      }
      return isAvailable;
    }


        //checking items
    checkItemSingle(item){

             const obj = {
    
                 code:item.group_items.code,
                 description:item.group_items.description,
                 id:item.group_items.id,
                 name:item.group_items.name,
                 picture:item.group_items.picture,
                 qty:item.group_items.qty,
                 price:item.group_items.price,
      
             }
             


        for(let result of this.FinalArrayForServer){
       this.stringArr.push(result.group_items);

     }

      var isAvailable =false;
      for(var i = 0; i < this.stringArr.length; i++) {
        if(this.stringArr[i].id === obj.id){
          isAvailable=true;
          break;
        }
      }
      return isAvailable;

    }
 




  }



