import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {SelectModel}  from '../../pages/about/SelectModel';
import { SelectCartProvider}  from '../../providers/select-cart/select-cart';
import { ObjModel }  from '../../pages/list/item';
import { ItemDetails}  from '../../pages/list/item_details';
import { Http,Response,RequestOptions,Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { HomePage} from '../../pages/home/home';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
	public Cart:any;
	T_Amt : number=0.00;
	Temp_List:any = [];
  showEmptyCartMessage: boolean = false;
  user_id;

  constructor(public storage:Storage,public navCtrl: NavController, public navParams: NavParams,public Select:SelectCartProvider,public AlertCtrl:AlertController,public http:Http) {
   this.storage.get('user_id').then((val) => {
      this.user_id = JSON.parse(val);
   });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

  EmptyOrNo(){
    if(this.Select.SelectArray.length>0){
       this.showEmptyCartMessage=false;
    }else{
     this.showEmptyCartMessage=true;
    }
  }


 	//eqal function for NgInit()
 	ionViewWillEnter() {
 		this.loadData();
     this.EmptyOrNo();
 	}

 	// load data 
 	public loadData(){
 		this.Cart = this.Select.SelectArray;
     console.log('s',this.Cart);
 		this.calcTotalAmount();
 	}



 	 	//decrement items
 	setDecrement(item: any){
 		if(item.qty > 0 && item.qty !== 1) {
 			item.qty--;
 			if(this.checkItem(item) === true){
 				let itemIndex = this.Select.SelectArray.findIndex(obj => obj.itmcode == item.itmcode);
 				this.Select.SelectArray[itemIndex] = item;
 				this.calcTotalAmount();
 			}

 		} 
 	}

 	//increment items
 	setIncrement(item: any){
 		item.qty++;  
 		if(this.checkItem(item) === true){
 			let itemIndex = this.Select.SelectArray.findIndex(obj => obj.itmcode == item.itmcode);
 			this.Select.SelectArray[itemIndex] = item;
 			this.calcTotalAmount();

 		}	
 	}

 	 	//checking items
 	checkItem(item){
 		var isAvailable =false;
 		for(var i = 0; i < this.Select.SelectArray.length; i++) {
 			if(this.Select.SelectArray[i].itmcode === item.itmcode){
 				isAvailable=true;
 				break;
 			}
 		}
 		return isAvailable;
 	}


 	//remove item form item
 	setRemoveItems(item:any){
 		if(this.checkItem(item) === true ){
 			this.Select.SelectArray = this.Select.SelectArray.filter(obj => obj.itmcode !== item.itmcode);
 			this.Cart =this.Cart.filter(obj=>obj.itmcode!==item.itmcode);
 			this.calcTotalAmount();
 			
 		}
 	}


 	//calculate Total
 	public calcTotalAmount(){
 		this.T_Amt=0;
 		for(var i=0;i<this.Select.SelectArray.length;i++){
 			this.T_Amt+=(Number(this.Select.SelectArray[i].itmprice))*(Number(this.Select.SelectArray[i].qty));
 		}
 	}


 	 	//check cart is empty
 	isEmptyCart() {
 		if (this.Select.SelectArray.length==0) return true ;
 		return false ;
 	}








 	saveItem(){
   
   // localStorage["TempCartItems"] = JSON.stringify(this.Select.SelectArray);

 	  //Array Modifiers
        var obj = {
           list_name:"",
           user_id:this.user_id,
           group_items:this.Select.SelectArray
        }

   const alert = this.AlertCtrl.create({
       title: 'List',
       inputs: [
       {
         name: 'List',
         placeholder: 'List Name'
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
         text: 'Create',
         handler: data => {
              obj.list_name=data.List;
           // pass data array
           console.log('check array',obj);

           let list=JSON.stringify(obj);
           
           var base_url = "http://snap.iqmedialabs.com/create_basket";

              let headers = new Headers({ 'Content-Type': 'application/json' });
              let options = new RequestOptions({ headers: headers });

  

              this.http.post(base_url,list,options)
              .subscribe(data => {
                let body = data.json()
                console.log(body);

                if(body.status === true){
                  let alert = this.AlertCtrl.create({
                    title: 'Success',
                    subTitle: ''+body.message,
                    buttons: ['Dismiss']
                  });
                  alert.present();
                   this.Select.SelectArray.length = 0;
                   localStorage.removeItem('TempCartItems');
                   this.navCtrl.push(HomePage);
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



           console.log(list);
         }
       }
       ]
     });
     alert.present();

 	}





}
