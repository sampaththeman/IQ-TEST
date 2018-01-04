import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {ProfileEditPage} from '../../pages/profile-edit/profile-edit';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ProfilePopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-popover',
  templateUrl: 'profile-popover.html',

})
export class ProfilePopoverPage {
  user_name;
  user_id;
  welcome_msg;
 
  constructor(public storage:Storage,public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
    this.loadData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePopoverPage');
    this.loadData();
  }

//navigate to edit pages
  FireEditPages(){
    this.navCtrl.push(ProfileEditPage);
  }


  loadData(){



     this.storage.get('profile_data').then((val) => {

     let profile = JSON.parse(val); 
      
 
     this.user_name = profile.user_name;
     this.user_id = profile.user_id;
     this.welcome_msg = profile.message;

     });

 

  }


 //close view 
  close(){
  	this.viewCtrl.dismiss();
  }

}
