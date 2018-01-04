	import { Component,ChangeDetectorRef } from '@angular/core';
	import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
	import {HomePage} from '../home/home';
	import { Http,Response,Headers, RequestOptions } from '@angular/http';
	import {FinalCartForServerProvider}  from '../../providers/final-cart-for-server/final-cart-for-server';
	import * as $ from 'jquery';
	import { Storage } from '@ionic/storage';
	import { LoadingController } from 'ionic-angular';


	/**
	 * Generated class for the DetailsPage page.
	 *
	 * See https://ionicframework.com/docs/components/#navigation for more info on
	 * Ionic pages and navigation.
	 */

	 @IonicPage()
	 @Component({
	 	selector: 'page-details',
	 	templateUrl: 'details.html',
	 })
	 export class DetailsPage {
	 	item;
	 	index;
	 	groceries: any;
	 	Chapter = [];
	 	TempChapter = [];
	 	hearted = "secondary";
	 	public ShopItems:any;

	 	public like_btn = {
	 		color: 'danger',
	 		icon_name: 'heart-outline'
	 	};

	 	//loading items 
	 	constructor(public loading:LoadingController,public storage:Storage,public http:Http,public navCtrl: NavController, public navParams: NavParams, public alertCtrl:AlertController,public ChangeDetector:ChangeDetectorRef,public FinalCart:FinalCartForServerProvider) {
	 		this.item = navParams.data.item;
	 		this.load();
	 		this.Chapter = navParams.data.item.group_items;
	 		this.index = navParams.data.index; 
	 		this.likeButton;
	 	}

// load baskets
load() {
	if (this.ShopItems) {
            // already loaded data
            return Promise.resolve(this.ShopItems);
        }

        // don't have the data yet
        return new Promise(resolve => {

        	var base_url="http://snap.iqmedialabs.com/user_baskets";

        	let loading = this.loading.create({
        		content: 'Loading user baskets.. Please wait...',
        		spinner: 'crescent'
        	});
        	loading.present();

        	this.http.get(base_url).map(res => res.json()).subscribe(data => {
        		let items = data;
        		this.ShopItems = data;
        		resolve(this.ShopItems);
        		loading.dismiss();



        	},
        	err => {
        		console.log('error in Json');

        	});

        });
    }

    ionViewDidLoad() {
    	console.log('ionViewDidLoad DetailsPage');
    }


	 	//update baskets 

	 	public update_baskets(item){

	 		var base_url ="http://snap.iqmedialabs.com/update_basket";


	 	}

       //remove item group
	 	removegroup(){
	 		console.log('Items',this.item);

	 		let  obj = JSON.stringify({
	 			"group_id":this.item.group_items[0].group_id,
	 			"group_items":[{
	 				"itmcode":this.item.group_items[0].code,
	 				"qty":this.item.group_items[0].qty,
	 				"price":this.item.group_items[0].itemprice,
	 				"item_removed": "",
	 				"group_removed":"Y"
	 			}]  

	 		})

	 		let headers = new Headers({ 'Content-Type': 'application/json' });
	 		let options = new RequestOptions({ headers: headers });

	 		var base_url="http://snap.iqmedialabs.com/update_basket";


	 		
	 					this.http.post(base_url,obj,options)
	 					.subscribe(data => {
	 						let body = data.json()
	 						console.log(body);
	 						if(body.status===true){

	 							let alert = this.alertCtrl.create({
	 								title: 'Success',
	 								subTitle: ''+body.message,
	 								buttons: ['Dismiss']
	 							});
	 							alert.present();

	 							this.navCtrl.push(HomePage);
	 							
	 						}else{


	 						}

	 						
	 					}, error => {

	 					});


	 	}

	 	//passing paramneter to remove object 
	 	removeItem(item){

	 		let confirm = this.alertCtrl.create({
	 			title: 'Are you sure ?',
	 			message: 'Are you sure you want to remove this item from favourite?',
	 			buttons: [
	 			{
	 				text: 'Cancel',
	 				handler: () => {
	 				}
	 			},
	 			{
	 				text: 'Ok',
	 				handler: () => {

	 					//old logic

	 					// this.navCtrl.push(HomePage,{item:item});
	 					// this.groceries = JSON.parse(localStorage.getItem("ShopItems"));

	 					//change below logic  to 
	 					
	 					// var  ii = this.groceries.splice(this.index, 1);
	 					var  ii = this.ShopItems.splice(this.index,1);
	 					localStorage.setItem('ShopItems', JSON.stringify(this.ShopItems));

	 					console.log('remarks',item);

	 					let  obj = JSON.stringify({
	 						"group_id":item.group_items[0].group_id,
	 						"group_items":[{
	 							"itmcode":item.group_items[0].code,
	 							"qty":item.group_items[0].qty,
	 							"price":item.group_items[0].itemprice,
	 							"item_removed": "Y",
	 							"group_removed":"Y"
	 						}]  

	 					})

	 					console.log('Obj',obj);


	 					let headers = new Headers({ 'Content-Type': 'application/json' });
	 					let options = new RequestOptions({ headers: headers });

	 					var base_url="http://snap.iqmedialabs.com/update_basket";

	 					this.http.post(base_url,obj,options)
	 					.subscribe(data => {
	 						let body = data.json()
	 						console.log(body);
	 						if(body.status===true){

	 							let alert = this.alertCtrl.create({
	 								title: 'Success',
	 								subTitle: ''+body.message,
	 								buttons: ['Dismiss']
	 							});
	 							alert.present();

	 							this.navCtrl.push(HomePage);
	 							
	 						}else{


	 						}

	 						
	 					}, error => {

	 					});

	 					if(this.FinalCart.FinalArrayForServer.length > 0 ){        
	 						this.FinalCart.FinalArrayForServer = this.FinalCart.FinalArrayForServer.filter(obj => obj.group_items!== obj.group_items);
	 						console.log( this.FinalCart.FinalArrayForServer );  
	 						this.FinalCart.decrementBadgeCount();

	 					}else{



	 					}



	 				}
	 			}
	 			]
	 		});

	confirm.present();


}

	 	//removing objects 
	 	removeBulkItems(item){

	 		let confirm = this.alertCtrl.create({
	 			title: 'Are you sure ?',
	 			message: 'Are you sure you want to remove this item from the list?',
	 			buttons: [
	 			{
	 				text: 'Cancel',
	 				handler: () => {
	 				}
	 			},
	 			{
	 				text: 'Ok',
	 				handler: () => {


	 					let Obj=JSON.stringify( {
	 						"group_id":item.group_id,
	 						"group_items":[{
	 							"itmcode":item.code,
	 							"qty":item.qty,
	 							"price":item.itemprice,
	 							"item_removed":"Y",
	 							"group_removed":""
	 						}]
	 					})

	 					console.log('Show Object',Obj);

	 					let headers = new Headers({ 'Content-Type': 'application/json' });
	 					let options = new RequestOptions({ headers: headers });

	 					var base_url="http://snap.iqmedialabs.com/update_basket";

	 					this.http.post(base_url,Obj,options)
	 					.subscribe(data => {
	 						let body = data.json()
	 						console.log(body);

	 						if(body.status===true){

	 							let alert = this.alertCtrl.create({
	 								title: 'Success',
	 								subTitle: ''+body.message,
	 								buttons: ['Dismiss']
	 							});
	 							alert.present();

	 							this.navCtrl.push(HomePage);
	 							
	 						}else{


	 						}
	 					}, error => {

	 					});


	 					if(this.TempChapter.length  > 0 && this.FinalCart.checkItem(item) === true){
	 						this.FinalCart.FinalArrayForServer = this.FinalCart.FinalArrayForServer.filter(obj => obj.group_items !== item);
	 						this.Chapter= this.Chapter.filter(obj => obj !== item);
	 						this.TempChapter = this.Chapter;
	 						this.FinalCart.decrementBadgeCount(); 
	 						console.log('Final Cart',this.FinalCart.FinalArrayForServer);

	 					}else {
	 						this.Chapter = this.Chapter.filter(obj => obj !== item);
	 						this.TempChapter = this.Chapter;

	 					}
	 				}
	 			}
	 			]
	 		});

	confirm.present();

}


	 	//adding items to the list 
	 	addtoList(item){
	 		
	 		this.likeButton();

	 		//object array  that pass into Web services
	 		var obj = {
	 			group_id:item.group_id,
	 			group_items:{
	 				code:item.group_items[0].code,
	 				description:item.group_items[0].description,
	 				id:item.group_items[0].id,
	 				name:item.group_items[0].name,
	 				picture:item.group_items[0].picture,
	 				qty:item.group_items[0].qty,
	 				price:item.group_items[0].price,
	 				active:0
	 			}  

	 		}

	 		console.log('Obj',obj);
	 	}



	 	//like button 
	 	likeButton() {


	 		if(this.item.group_items[0].active===1){
	 			console.log(this.item.group_items[0].active);
	 			this.like_btn.color='black';
	 			console.log('im inside');
	 			// if(this.like_btn.icon_name === 'heart-outline') {
	 				// 	this.like_btn.icon_name = 'heart';
	 				// 	this.like_btn.color = 'danger';

	 				// }
	 				// else {
	 					// 	this.like_btn.icon_name = 'heart-outline';
	 					// 	this.like_btn.color = 'black';
	 					// }
	 				}

	 			}

	 			sendPurchaseRequest(item){
	 				if(item.group_items[0].qty > 0){
	 					

	 					var obj = {
	 						group_id:item.group_id,
	 						group_items:{
	 							code:item.group_items[0].code,
	 							description:item.group_items[0].description,
	 							id:item.group_items[0].id,
	 							name:item.group_items[0].name,
	 							picture:item.group_items[0].picture,
	 							qty:item.group_items[0].qty,
	 							itemprice:item.group_items[0].itemprice,
	 							group_id:item.group_items[0].group_id,
	 							active:0
	 						}  

	 					}
	 					console.log('Setcart',obj);
	 					
	 					this.FinalCart.setCartItemsSingle(obj);
	 					console.log('Final Array',this.FinalCart.FinalArrayForServer);


	 				}	 				 	 				
	 			}

	 			sendBulkPurchaseRequest(){
	 				if(this.TempChapter.length > 0 ){
	 					console.log('Fired');
	 					this.TempChapter.forEach(item=>{
	 						console.log(item);
	 						this.FinalCart.setCartItems(item);
	 					})
	 				}else{
	 					this.TempChapter = this.Chapter;
	 					this.TempChapter.forEach(item => {
	 						this.FinalCart.setCartItems(item);
	 					});
	 				}
	 				console.log(this.FinalCart.FinalArrayForServer);
	 			}



	 			//decrement items
	 			setDecrement(item: any){
	 				if(item.qty > 0) {
	 					item.qty--;
	 				} 
	 			}

	 			//increment items
	 			setIncrement(item: any){
	 				item.qty++;   
	 			} 

                //decrement items
                setDecrementSingle(item:any){
                	console.log('Set Decrement',item);
                	if(item.group_items[0].qty){
                		item.group_items[0].qty--;
                	}
                }

	 			//increment items
	 			setIncrementSingle(item:any){

	 				item.group_items[0].qty++;
	 			}



	 			//set item by Index
	 			setItemQtyByIndex(item:any){

	 				if(this.TempChapter.length >0){
	 					if(item.qty !=0){
	 						let updateItem =  this.TempChapter.find(this.findIndexToUpdate, item.id);
	 						let index = this.TempChapter.indexOf(updateItem);
	 						this.TempChapter[index] = item;
	 					}
	 				}else{

	 					if(item.qty !=0){
	 						let updateItem =  this.Chapter.find(this.findIndexToUpdate, item.id);
	 						let index = this.Chapter.indexOf(updateItem);
	 						this.Chapter[index] = item;
	 					}
	 				}


	 			}

	 			//finds correct index to upload files 
	 			findIndexToUpdate(item) { 
	 				return item.id === this;
	 			}





	 		}
