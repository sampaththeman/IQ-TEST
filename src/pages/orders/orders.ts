import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http,Response,RequestOptions,Headers} from '@angular/http';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { OrderPipe} from '../../pipes/order/order'
import 'rxjs/add/operator/debounceTime';
import 'rxjs/Rx';


/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
   selector: 'page-orders',
   templateUrl: 'orders.html',
 })
 export class OrdersPage {
   OrderList =[];
   user_id;
   Final =[];
   showEmptyCartMessage: boolean = false;

   constructor(public storage:Storage,public http:Http,public navCtrl: NavController, public navParams: NavParams,public loadingCtrl:LoadingController) {
     this.storage.ready()
     .then(() => this.loadOrders())
   }

   ionViewDidLoad() {
     console.log('ionViewDidLoad OrdersPage');
   }

   ionViewWillEnter() {
     this.storage.ready()
     .then(() => this.loadOrders())
     // .then(()=> this.EmptyOrNot())
   }


   loadOrders(){

     this.storage.get('user_id').then((val) => {
       let profile=JSON.parse(val);
       this.user_id = profile
       if(this.user_id != null){
         this.loadCart();
       }

     }).catch((empty) => {
       console.log('ERROR');

     });

   }


   EmptyOrNot(){
     if(this.OrderList.length>0){
       this.showEmptyCartMessage=false;
     }else{
       this.showEmptyCartMessage=true;
     }
   }


   loadItemInside(item_id){

     let loading = this.loadingCtrl.create({
       content: 'Loading Orders ! Please wait...',
       spinner: 'crescent'

     });

     this.Final=OrderPipe.prototype.transform(this.OrderList,item_id);

     setTimeout(() => {
       loading.dismiss();
     }, 5000);
   }


   loadCart(){

     var base_url="http://snap.iqmedialabs.com/order_history";

     let headers = new Headers({ 'Content-Type': 'application/json' });
     let options = new RequestOptions({ headers: headers });



     let obj=JSON.stringify({
       user_id:this.user_id
     });

     let loading = this.loadingCtrl.create({
       content: 'Loading Orders ! Please wait...',
       spinner: 'crescent'
     });
     loading.present();



     this.http.post(base_url,obj,options)
     .subscribe(data => {
       let body = data.json()
 
       if(body.status===false){
         this.EmptyOrNot();
         loading.dismiss();
       }else{
         this.OrderList = body;
         loading.dismiss();

       }
     }, error => {
       let loading = this.loadingCtrl.create({
         content: 'Loading Orders ! Please wait...',
         spinner: 'crescent'
       });
       loading.present();

       console.log("Oooops!");

     });




   }

 }
