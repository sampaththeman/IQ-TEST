import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Http,Response,Headers, RequestOptions } from '@angular/http';
import {LoginPage}  from '../../pages/login/login';
import 'rxjs/Rx';
/**
 * Generated class for the UserRegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-registration',
  templateUrl: 'user-registration.html',
})
export class UserRegistrationPage {

authForm: FormGroup;

masks:any;
phoneNumber: any = "";

//generate controllers
fname: AbstractControl;
lname: AbstractControl;
password: AbstractControl;
street: AbstractControl;
address: AbstractControl;
town: AbstractControl;
telephone: AbstractControl;
email:AbstractControl;
gender:AbstractControl;


  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder:FormBuilder , public http:Http,public AlertCtrl:AlertController ) {
    this.masks={
    	phoneNumber: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]

    };

    this.authForm = formBuilder.group({
            fname: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            lname: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
            street: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
            address: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
            town: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            gender: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            telephone: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
            email:['',Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])]          
        });



  }

  onSubmit(value: any):void{
    
    // base url definition
    var base_url="http://snap.iqmedialabs.com/reg";

    //Object Definition
    interface Name {
      inpt_fname: string;
      inpt_lname: string;
      inpt_passwd:string;
      inpt_street:string,
      inpt_addrss:string,
      inpt_town:string,
      inpt_email:string,
      inpt_contact:number,
      inpt_gender:string
    }

   
     let dataz = JSON.stringify({
      inpt_fname: value.fname,
      inpt_lname: value.lname,
      inpt_passwd: value.password,
      inpt_street:value.street,
      inpt_addrss:value.address,
      inpt_town:value.town,
      inpt_email:value.email,
      inpt_contact:value.telephone,
      inpt_gender:value.gender
    });

    console.log('Gender',dataz);




    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });


    // POST METHOD TO SERVER
    this.http.post(base_url,dataz,options)
    .subscribe(data => {
      let body = data.json()
      console.log(body);
      if(body.status===true){
        let alert = this.AlertCtrl.create({
          title: 'Sucsess',
          subTitle: 'Sucessfully Registerd!',
               buttons: [
                {
                    text: 'Ok',
                    handler: () => {
                         this.navCtrl.push(LoginPage);
                          this.navCtrl.popToRoot();
                    }
                }
                ]
        });
        alert.present();
           
      }else{
          let alert = this.AlertCtrl.create({
          title: 'Error',
          subTitle: ''+body. message+'! Please try again.',
          buttons: ['Dismiss']
        });
        alert.present();
          
      }

    }, error => {
      console.log("Oooops!");
    });





  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserRegistrationPage');
  }

}
