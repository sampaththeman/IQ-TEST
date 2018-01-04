import {Component,OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams,AlertController,ViewController } from 'ionic-angular';
import {CartProvider}  from '../../providers/cart/cart';
import {checkout} from '../cart/CheckOut'
import {CartForServerModel}  from '../../pages/details/CartForServer';
import {CartForServerDetails} from '../../pages/details/CartForServerDetails';
import {FinalCartForServerProvider}  from '../../providers/final-cart-for-server/final-cart-for-server';
import {HomePage} from '../../pages/home/home';
import { Http,Response,RequestOptions,Headers } from '@angular/http';
import {SendModel} from '../../pages/Cart/sendModel';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-cart',
 	templateUrl: 'cart.html',
 })
 export class CartPage {

 	public Cart:any;
 	stringArr = [];
 	T_Qty : number =0;
 	T_Amt : number=0;
 	checkArray :Array<checkout> = new  Array <checkout>();
   SubmitArray : Array<SendModel> = new Array <SendModel>();
 	CartBadgeCount : number = 0; // default 0
   showEmptyCartMessage: boolean = false;
   user_id;



   constructor(public storage:Storage,public navCtrl: NavController,public ViewCtrl:ViewController, public navParams: NavParams,public cart:CartProvider,public http:Http,public AlertCtrl:AlertController,public FinalCart:FinalCartForServerProvider) {
     this.storage.ready()
     .then(() => this.getuser())


   }

   EmptyOrNot(){
     if(this.FinalCart.FinalArrayForServer.length>0){
       this.showEmptyCartMessage=false;
     }else{
       this.showEmptyCartMessage=true;
     }
   }

 	//eqal function for NgInit()
 	ionViewWillEnter() {
 		this.loadData();
 		// this.calcTotalQty();
 		this.CartBadgeCount = this.FinalCart.CartBadgeCount;
 		this.calcTotalAmount();
     this.EmptyOrNot();
   }

 	// load data 
 	public loadData(){
 		this.Cart = this.FinalCart.FinalArrayForServer;
 		console.log('provider',this.Cart);
 	}

 	//remove item form item
 	setRemoveItems(item:any){
 		console.log('Item',item);
 		if(this.checkItem(item) === true ){
       // console.log("im inside this shit ");
       this.FinalCart.FinalArrayForServer = this.FinalCart.FinalArrayForServer.filter(obj => obj.group_items !== item.group_items);
       // console.log('Remove Items',this.FinalCart.FinalArrayForServer);
       this.FinalCart.decrementBadgeCount();
       this.CartBadgeCount =this.FinalCart.CartBadgeCount;
       this.calcTotalAmount();
       this.Cart =this.FinalCart.FinalArrayForServer;	
     }
   }



 	//decrement items
 	setDecrement(item: any){
 		console.log('item',item);
 		if(item.group_items.qty > 0 && item.group_items.qty !== 1) {
 			item.group_items.qty--;
 			if(this.checkItem(item) === true){
 				let itemIndex = this.FinalCart.FinalArrayForServer.findIndex(obj => obj.group_items == item.group_items);
 				this.FinalCart.FinalArrayForServer[itemIndex] = item;
 				this.calcTotalAmount();

 			}

 		} 
 	}

 	//increment items
 	setIncrement(item: any){
 		console.log('item',item);
 		item.group_items.qty++;  
 		if(this.checkItem(item) === true){
 			let itemIndex = this.FinalCart.FinalArrayForServer.findIndex(obj => obj.group_items == item.group_items);
 			this.FinalCart.FinalArrayForServer[itemIndex] = item;
 			this.calcTotalAmount();
 		}	
 	} 


 	//checking items
 	checkItem(item){
 		var isAvailable =false;
 		for(var i = 0; i < this.FinalCart.FinalArrayForServer.length; i++) {
 			if(this.FinalCart.FinalArrayForServer[i].group_items === item.group_items){
 				isAvailable=true;
 				break;
 			}
 		}
 		return isAvailable;
 	}

 	//change qty with ammount
 	public calcTotalQty(){
 		this.T_Amt=0;
 		for (var i=0; i<this.cart.CartDataArray.length;i++){
 			console.log(this.cart.CartDataArray[i].qty);
 			this.T_Qty+= (Number(this.cart.CartDataArray[i].qty));
 		}
 	}


 	//calculate Total
 	public calcTotalAmount(){
 		this.T_Amt=0;
     this.stringArr=[];
     for(let result of this.FinalCart.FinalArrayForServer){
       this.stringArr.push(result.group_items);
     }

     for (var i=0; i<this.stringArr.length;i++){

       this.T_Amt+= ((this.stringArr[i].itemprice)*this.stringArr[i].qty);
     }


   }

 	//check cart is empty
 	isEmptyCart() {
 		if (this.FinalCart.FinalArrayForServer.length==0) return true ;
 		return false ;
 	}

   getuser(){
     this.storage.get('user_id').then((val) => {
       this.user_id = JSON.parse(val);
       console.log('user',this.user_id);
     });

   }


 	//list creation
   PlaceOrderRequest(){

     var base_url="http://snap.iqmedialabs.com/place_order";

     let headers = new Headers({ 'Content-Type': 'application/json' });
     let options = new RequestOptions({ headers: headers });

     console.log('Final Cart',this.FinalCart.FinalArrayForServer);




     var obj = {
       user_id:this.user_id,
       group_items:this.FinalCart.FinalArrayForServer
     }



     this.FinalCart.FinalArrayForServer.forEach(item => {
         console.log('a',item.group_items);
       this.SubmitArray.push(new SendModel(item.group_items));
       console.log('subarr',this.SubmitArray);
       
     });

     let letzx = this.FinalCart.FinalArrayForServer;
     console.log(letzx);






     let dataz = JSON.stringify({
       user_id:this.user_id,
       group_items:this.SubmitArray
     });



     this.http.post(base_url,dataz,options)
     .subscribe(data => {
       let body = data.json()
       console.log(body);

       if(body.status===true){
         let alert = this.AlertCtrl.create({
           title: 'Success',
           subTitle: ''+body.message+'!',
           buttons: ['Dismiss']
         });
         alert.present();
  this.SubmitArray.length=0;
  this.FinalCart.FinalArrayForServer.length=0;
  this.FinalCart.CartBadgeCount=0;
  this.navCtrl.push(HomePage);

       }else{

         let alert = this.AlertCtrl.create({
           title: 'Error',
           subTitle: ''+body.message+'!',
           buttons: ['Dismiss']
         });
         alert.present();

       }

     }, error => {
       console.log("Oooops!");

     });


   }









   ionViewDidLoad() {
     console.log('ionViewDidLoad CartPage');
   }

 }
