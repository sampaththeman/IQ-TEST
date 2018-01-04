import { Component } from '@angular/core';
import { NavController,PopoverController,AlertController,ToastController,App } from 'ionic-angular';
import {ProfilePopoverPage}  from '../../pages/profile-popover/profile-popover';
import { Http,Response } from '@angular/http';
import {OrdersPage}  from '../../pages/orders/orders';
import {LoginPage} from '../../pages/login/login';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public _htmlProperty: string = "<p><span name=\"alarm\" style=\"display:inline-block;font-family:Ionicons;\" class=\"icon icon-md ion-md-alarm\"></span> 26 février 2016</p><p><div name=\"pin\" style=\"display:inline-block;font-family:Ionicons;\" class=\"icon icon-md ion-md-alarm\"></div> 52, rue des Paquerette</p>";
  
  user_name;
  user_id;
  welcome_msg;
  user_pic;


  constructor(public _app:App,public storage:Storage,public navCtrl: NavController,public PopCtrl:PopoverController,public http:Http,public AlertCtrl:AlertController,public ToastCtrl:ToastController) {
    this.storage.ready()
    .then(() => this.temp_activities())

  }

//call popover methods
presentPopover(myEvent) {
  let popover = this.PopCtrl.create(ProfilePopoverPage);
  popover.present({
    ev: myEvent
  });
}


//load user ativities

public temp_activities(){

  this.storage.get('profile_data').then((val) => {

    let profile=JSON.parse(val);
    console.log(profile);


    this.user_name = profile.user_name;
    this.user_id = profile.user_id;
    this.welcome_msg = profile.msg;
    this.user_pic = profile.picture;



  });

}

access_orderAwaiting(){
  this.navCtrl.push(OrdersPage);
}

logout(){

// your logout code whatevers
this.storage.clear();
localStorage.clear();
this._app.getRootNav().setRoot(LoginPage);
// this.navCtrl.push(LoginPage);


}




updatePassword(){
  let alert = this.AlertCtrl.create({
    title: 'Password Change',
    message: 'Are you sure, you want to update your password?',
    buttons: [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    },
    {
      text: 'Yes',
      handler: () => {

        let alert = this.AlertCtrl.create({
          title: 'Update your password',
          inputs: [
          {
            name: 'Password',
            placeholder: 'password'
          },
          {
            name: 'Confirm_Password',
            placeholder: 'password'
          }

          ],
          buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Send',
            handler: data => {
              if(this.validatePass(data)){
                console.log('Data logic',data);
              }else{
                this.showErrorToast();             
              }
              console.log('Password',data);

            }
          }
          ]
        });
        alert.present();




      }
    }
    ]
  });
alert.present();


}



showErrorToast() {
  let toast = this.ToastCtrl.create({
    message:'Password do not match',
    duration: 3000,
    position: 'top'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}




validatePass(data) {

  var base_url="";


  this.http.get(base_url).map(res => res.json()).subscribe(data => {
    let items = data.products;

     // your logic for password reset 



   },
   err => {
     console.log('error in Json');

   });  
}

leaveFeedback(){

  let alert = this.AlertCtrl.create({
    title: 'Feedback',
    inputs: [
    {
      name: 'Feedback',
      placeholder: 'What do you think about us !'
    }
    ],
    buttons: [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: data => {
        console.log('Cancel clicked');
      }
    },
    {
      text: 'Send',
      handler: data => {


        var obj= {
          user_name:'Sampaththeman',
          feedback:data.Feedback
        }
        console.log('Santizne',obj);
      }
    }
    ]
  });
  alert.present();
}

}
