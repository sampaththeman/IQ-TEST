import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ToastController} from 'ionic-angular';
import { trigger, state, style, transition, animate, keyframes, AUTO_STYLE } from '@angular/animations';
import { HomePage } from '../../pages/home/home';
import {UserRegistrationPage} from '../../pages/user-registration/user-registration';
import { TabsPage } from '../../pages/tabs/tabs';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import firebase  from 'firebase';
import { Http,Response,Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/Rx';
/**
 * Generated class for the LoginPage page.
 *

 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
   selector: 'page-login',
   templateUrl: 'login.html',animations: [
   
   //For the logo
   trigger('flyInBottomSlow', [
     state('in', style({
       transform: 'translate3d(0,0,0)'
     })),
     transition('void => *', [
       style({transform: 'translate3d(0,2000px,0'}),
         animate('2000ms ease-in-out')
         ])
     ]),
   
   //For the background detail
   trigger('flyInBottomFast', [
     state('in', style({
       transform: 'translate3d(0,0,0)'
     })),
     transition('void => *', [
       style({transform: 'translate3d(0,2000px,0)'}),
       animate('1000ms ease-in-out')
       ])
     ]),
   
   //For the login form
   trigger('bounceInBottom', [
     state('in', style({
       transform: 'translate3d(0,0,0)'
     })),
     transition('void => *', [
       animate('2000ms 200ms ease-in', keyframes([
         style({transform: 'translate3d(0,2000px,0)', offset: 0}),
         style({transform: 'translate3d(0,-20px,0)', offset: 0.9}),
         style({transform: 'translate3d(0,0,0)', offset: 1})
         ]))
       ])
     ]),
   
   //For login button
   trigger('fadeIn', [
     state('in', style({
       opacity: 1
     })),
     transition('void => *', [
       style({opacity: 0}),
       animate('1000ms 2000ms ease-in')
       ])
     ])
   ]
 })
export class LoginPage {

	logoState: any = "in";
  cloudState: any = "in";
  loginState: any = "in";
  formState: any = "in";
  registerState:any ="in";

  username:string;
  password:string;
  

  constructor(public ToastCtrl:ToastController,private storage: Storage,public navCtrl: NavController, public navParams: NavParams,public facebook:Facebook,public http:Http,public AlertCtrl:AlertController) {
    this.loadSliderImg();
  }

  login(){

    var base_url="http://snap.iqmedialabs.com/user_login";

    let data = JSON.stringify({
      usr_name: this.username,
      usr_passwd: this.password,

    });


    if(this.username && this.password != null){

      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });


      this.http.post(base_url,data,options)
      .subscribe(data => {
        let body = data.json()
        
        this.storage.set('profile_data', JSON.stringify(body));
        this.storage.set('user_id',JSON.stringify(body.user_id));
        if(body.status===true){
          this.navCtrl.setRoot(TabsPage);
          this.navCtrl.push(HomePage);
          this.navCtrl.popToRoot();
        }else{

          // let alert = this.AlertCtrl.create({
          //   title: 'Error',
          //   subTitle: ''+body.message+'Please try again.',
          //   buttons: ['Dismiss']
          // });
          // alert.present();

          let toast = this.ToastCtrl.create({
            message: ''+body.message +'Please try again.',
            duration: 3000,
            position: 'top',
            cssClass: "login-error"
          });

          toast.onDidDismiss(() => {
            // console.log('Dismissed toast');
          });

          toast.present();
        }
      }, error => {

      });

    }else{
      // let alert = this.AlertCtrl.create({
      //   title: '',
      //   subTitle: 'Please input your username and password!',
      //   buttons: ['Dismiss']
      // });
      // alert.present();

      let toast = this.ToastCtrl.create({
        message: 'Please input your username and password!',
        duration: 3000,
        position: 'top',
        cssClass: "login-error"
      });

      toast.onDidDismiss(() => {
            // console.log('Dismissed toast');
          });

      toast.present();
    }

    // window.localStorage.setItem('username', "sampaththeman");
    // window.localStorage.setItem('password',"Cosmos23");
    // this.navCtrl.setRoot(TabsPage);
    // this.navCtrl.push(HomePage);
    // this.navCtrl.popToRoot();


  }






  public loadSliderImg(){

    // var base_url="http://snap.iqmedialabs.com/slider_2";

    // this.http.get(base_url).map(res=>res.json()).subscribe(data=>{
    //   let items = data;
    //   console.log('Items',items);
    //   this.storage.set('Slider', JSON.stringify(items));
      // localStorage["Slider"] = JSON.stringify(items);

  //   this.storage.get('Slider').then((val) => {

  //     console.log('S',val);
  //    this.ImageArray=JSON.parse(val);
  // });



   // })
} 


  //facebook login

  fbAuth(){
    this.facebook.login(['email']).then(res=>{
      const fc= firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken)
      firebase.auth().signInWithCredential(fc).then(fs=>{
        this.navCtrl.push(HomePage);
        alert("firebase ")
      }).catch(err=>{
        alert("firebase Error")
      })
    }).catch(err=>{
      console.log(JSON.stringify(err));
    })

  }
  

  register(){
    this.navCtrl.push(UserRegistrationPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
