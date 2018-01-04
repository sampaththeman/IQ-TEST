import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { Http,Response,RequestOptions,Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import{NotificatonsPipe} from '../../pipes/notificatons/notificatons';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
   selector: 'page-notification',
   templateUrl: 'notification.html',
 })
 export class NotificationPage {
   user_id;
   Notification=[];
   Final=[];



   constructor(public loading:LoadingController,public AlertCtrl:AlertController,public storage:Storage,public navCtrl: NavController, public navParams: NavParams,public http:Http) {
    this.storage.ready()
    .then(() =>  this.getuser())
    .then(() =>  this.get_notifications())
     // this.get_notifications();

   }

   ionViewWillEnter(){
     this.storage.ready()
    .then(() =>  this.get_notifications())
   }



   ionViewDidLoad() {
     console.log('ionViewDidLoad NotificationPage');
   }

   //load user_id
    getuser(){
     this.storage.get('user_id').then((val) => {
       this.user_id = JSON.parse(val);
       console.log('user',this.user_id);
     });
}


  // Methods for get Notifications

  public get_notifications(){

    var base_url="http://snap.iqmedialabs.com/notifications";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });


    let dataz = JSON.stringify({
      user_id:this.user_id

    });

    this.http.post(base_url,dataz,options)
    .subscribe(data => {
      let body = data.json();
      this.Notification= body;
      console.log(body);
    }, error => {
      console.log("Oooops!");

    });

  }


    loadItemInside(item_id){

     let loading = this.loading.create({
       content: 'Loading Orders ! Please wait...',
       spinner: 'crescent'

     });

     this.Final=NotificatonsPipe.prototype.transform(this.Notification,item_id);
     console.log(this.Final);

     setTimeout(() => {
       loading.dismiss();
     }, 5000);
   }


}
