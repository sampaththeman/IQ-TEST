import { Component,EventEmitter,Input, Output } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {InlineEditorComponent} from 'ng2-inline-editor';
import { Camera } from '@ionic-native/camera';
import { Http,Response,RequestOptions,Headers } from '@angular/http';
import { Storage } from '@ionic/storage';



/**
 * Generated class for the ProfileEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
   selector: 'page-profile-edit',
   templateUrl: 'profile-edit.html',
   providers: [[Camera]]
 })
 export class ProfileEditPage {

   editing: boolean;
   editableFName = '';
   editableLName ='';
   editablePhone = '';
   editablestreet = '';
   editableAddress = '';
   editableTown = '';
   editableGender ='';
   editableImg;
   options:any;
   user_id;

   
   constructor(public storage:Storage,public navCtrl: NavController, public navParams: NavParams,private camera:Camera,public http:Http,public AlertCtrl:AlertController) {
     this.storage.ready()
     .then(() =>  this.getuser())
     .then(()=> this.get_profile())
   }





   public getuser(){
     this.storage.get('user_id').then((val) => {
       this.user_id = JSON.parse(val);
       console.log('user',this.user_id);
     });
   }

   public get_profile(){

     this.storage.get('profile_data').then((val) => {

       let profile=JSON.parse(val);
       console.log(profile);
       
       this.editableImg = profile.picture;

       let stringToSplit = profile.user_name;
       let x = stringToSplit.split(" ");
       console.log(x[0]);
       this.editableFName =x[0];
       this.editableLName =x[1];
       this.editablePhone =profile.phone;
       this.editablestreet = profile.street;
       this.editableAddress = profile.address;
       this.editableTown = profile.town;
       this.editableGender =profile.user_gender;
       
     });

   }



   load_profile(){

     var base_url="http://snap.iqmedialabs.com/profile_info";

     var obj={
       user_id:this.user_id
     }

     let headers = new Headers({ 'Content-Type': 'application/json' });
     let options = new RequestOptions({ headers: headers });


     this.http.post(base_url,JSON.stringify(obj),options)
     .subscribe(data => {
       let body = data.json()
       console.log(body);

       this.storage.set('profile_data', JSON.stringify(body));

     }, error => {
       console.log("Oooops!");
     });



   }




   saveEditable(value) {   

     var base_url="http://snap.iqmedialabs.com/prof_update";

     var obj = {
       user_id:this.user_id,
       Fname:this.editableFName,
       Lname:this.editableLName,
       Phone:this.editablePhone,
       Street:this.editablestreet,
       Address:this.editableAddress,
       Town:this.editableTown,
       Gender:this.editableGender,
       Profilepic:''
     }
     

     console.log(obj);

     let headers = new Headers({ 'Content-Type': 'application/json' });
     let options = new RequestOptions({ headers: headers });

     

     this.http.post(base_url,JSON.stringify(obj),options)
     .subscribe(data => {
       let body = data.json()
       console.log(body);

       if(body.status === true){
         let alert = this.AlertCtrl.create({
           title: 'Success',
           subTitle: 'Your information suceesfully saved!',
           buttons: ['Dismiss']
         });
         alert.present();
         this.load_profile();

       }else{
         let alert = this.AlertCtrl.create({
           title: 'Error',
           subTitle: 'Something went wrong.please check again!',
           buttons: ['Dismiss']
         });
         alert.present();

       }


     }, error => {
       console.log("Oooops!");
     });
     
   }



//take picture 

public takePicture(){
  this.options = {
    quality: 10,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
  }
  this.camera.getPicture(this.options)
  .then((imageData)=>{

    this.editableImg ='data:image/jpeg;base64,'+imageData;

    var base_url="http://snap.iqmedialabs.com/prof_update";

    console.log(imageData);

    let obj = {
      user_id:this.user_id,
      Fname:this.editableFName,
      Lname:this.editableLName,
      Phone:this.editablePhone,
      Street:this.editablestreet,
      Address:this.editableAddress,
      Town:this.editableTown,
      Gender:this.editableGender,
      Profilepic:'data:image/jpeg;base64,'+imageData
    }
    

    console.log(obj);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    

    this.http.post(base_url,JSON.stringify(obj),options)
    .subscribe(data => {
      let body = data.json()
      console.log(body);

      // write manual update profile data here 


      if(body.status === true){
        let alert = this.AlertCtrl.create({
          title: 'Success',
          subTitle: 'Your information suceesfully saved!',
          buttons: ['Dismiss']
        });
        alert.present();
        // this.storage.remove('profile_data');
        this.storage.remove('profile_data').then(() => {
          console.log('item removed!');
                 this.get_profile();
                   this.load_profile();
        });

        // this.get_profile();
        // this.load_profile();

      }else{
        let alert = this.AlertCtrl.create({
          title: 'Error',
          subTitle: 'Something went wrong.please check again!',
          buttons: ['Dismiss']
        });
        alert.present();

      }


    }, error => {
      console.log("Oooops!");
    });
    

  }).then((path) => {

  })
}



ionViewDidLoad() {
  console.log('ionViewDidLoad ProfileEditPage');
}



}
