import { Component,Input,OnInit,Injectable,Injector,ViewChild } from '@angular/core';
import { Http,Response } from '@angular/http';
import { NavController,Platform,ViewController,IonicPage,Slides} from 'ionic-angular';
import {CartDataModel} from '../about/cart_Data_Model';
import {CartProvider}  from '../../providers/cart/cart';
import {SelectCartProvider}  from '../../providers/select-cart/select-cart';
import {SelectModel}  from '../about/SelectModel';
import {ListPage}  from '../list/list';
import { ObjModel }  from '../../pages/list/item';
import { ItemDetails}  from '../../pages/list/item_details';
import {FinalCartForServerProvider}  from '../../providers/final-cart-for-server/final-cart-for-server';
import { SegmentFilterPipe } from '../../pipes/segment-filter/segment-filter';
import { SinglePurchasePage}  from '../../pages/single-purchase/single-purchase';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/Rx';



@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})



export class AboutPage {

  public ShopItems2: any;

  public keys:any;

  ListArray:{idx:number}[] = [];

  Items:any = [];

  public buttonClicked: boolean = false;

  Clicked:any=[];

  ImageArray:any[];

  public Categories:any;

  public CatID:any;

  public showLeftButton: boolean;

  public showRightButton: boolean;

  @ViewChild(Slides) slides: Slides;


  //Array Definition for Nested Array 
  First :Array<ObjModel> = new  Array <ObjModel>();
  Nested : Array<ItemDetails> = new Array <ItemDetails>();

  //Cart Array Definition 
  CartDataArray :Array<CartDataModel> = new  Array <CartDataModel>();


  //Select Array Definition
  SelectArray : Array<SelectModel> = new Array <SelectModel>();


  CartBadgeCount : number = 0; // default 0

  ITEM: string = "Food and Drink"; // initializing item Segments


  constructor(public loading:LoadingController,public storage:Storage,public navCtrl: NavController,private http:Http,private platform:Platform,public cart:CartProvider , public select:SelectCartProvider,public FinalCart:FinalCartForServerProvider,public viewCtrl: ViewController) {    
     this.storage.ready()
     .then(() => this.getKeys())
      .then(() => this.onToggleSelected())
     .then(() => this.Categories=SegmentFilterPipe.prototype.transform(this.ShopItems2,'Food and Drink'))
     .then(() =>this.loadSliderImg())
    // this.getItems();
    // this.Categories=SegmentFilterPipe.prototype.transform(this.ShopItems2,'Beverages');
    // this.loadSliderImg();
  }




  public SinglePage(item){
    var index = this.ShopItems2.indexOf(item);
    this.navCtrl.push(SinglePurchasePage,{item:item,index});
  }


  private async getKeys(){
    this.ShopItems2=[];
    this.keys = await  this.storage.get('Item_List').then((val) => {
      let value = JSON.parse(val);
      this.ShopItems2=(value);
      console.log(this.ShopItems2);
    });
  }



  //Search on navbar
  private isOn: boolean = false;

  getButtonText(): string {
    return `Switch ${ this.isOn ? 'Off' : 'On' }`;
  }
  setState(): void {
    this.isOn = !this.isOn;
  }

  toggleDetails() {
    this.isOn = !this.isOn;
  }


  initializeItems() {
    this.filterData(this.CatID);
  }


  getItems1(ev: any) {
    this.initializeItems()
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {  
      this.Categories = this.Categories.filter((item) => {
        return (item.itmname.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })  
    }
  }
   

  public loadSliderImg(){
   // this.ImageArray =JSON.parse(localStorage.getItem("Slider"));
   var base_url="http://snap.iqmedialabs.com/slider_2";

   let loading = this.loading.create({
     content: 'Please wait...',
     spinner: 'crescent'
   });
   loading.present();


   this.http.get(base_url).map(res=>res.json()).subscribe(data=>{
     let items = data;
     this.ImageArray=data;
     if(this.ImageArray.length>0){
       loading.dismiss();
     }
   })


  // this.ImageArray =JSON.parse(localStorage.getItem("Slider"));


  this.storage.get('Slider').then((val) => {

     // this.ImageArray=JSON.parse(val);
   });

}
  


  public slideChanged(): void {
    let currentIndex = this.slides.getActiveIndex();
    this.showLeftButton = currentIndex !== 0;
    this.showRightButton = currentIndex !== Math.ceil(this.slides.length() / 3);
  }
  

  // Method that shows the next slide
  public slideNext(): void {
    this.slides.slideNext();
  }

  // Method that shows the previous slide
  public slidePrev(): void {
    this.slides.slidePrev();
  }


  public filterData(categoryId: string): void {       
    this.Categories= SegmentFilterPipe.prototype.transform(this.ShopItems2,categoryId);
    this.CatID=categoryId;
  }



  ionViewDidLeave () {
    this.Categories=SegmentFilterPipe.prototype.transform(this.ShopItems2,'Food and Drink');
    console.log( 'view did leave' );
  }






  //eqal function for NgInit()
  ionViewWillEnter() {
    this.CartBadgeCount =this.FinalCart.CartBadgeCount;
    // this.getItems();
     this.storage.ready()
     .then(() => this.getKeys())
     .then(() => this.onToggleSelected())
     .then(() => this.CheckButtonClicked())
       // this.CheckButtonClicked();
    // this.onToggleSelected();
  }



  public getItems()
  {

    var base_url = "http://snap.iqmedialabs.com/";
    if(localStorage.getItem("ShopItems2") === null){
      this.http.get(base_url+'itemlist').map(res => res.json()).subscribe(data => {
        let items = data.data;
        this.ShopItems2=data.data;
        localStorage["ShopItems2"] = JSON.stringify(data.data);
      },
      err => {
        console.log('error in Json');

      });

    }else{
      this.ShopItems2 = JSON.parse(localStorage.getItem("ShopItems2"));  
      this.onToggleSelected();
    }
  }




  //add items to cart 
  setCartItems(item:any){

    console.log('imhere',item);
    if(!this.checkItem(item) && item.group_items[0].qty !=0){
      this.CartDataArray.push( new CartDataModel(item));
      // this.Nested.push(new ItemDetails(item) );

      this.incrementBadgeCount();
      //accesing provider

      this.cart.CartDataArray.push(new CartDataModel(item));
      this.cart.ActivateItems(item);


    }
  }

  //remove items from cart 
  setRemoveItems(item:any){
    if(this.checkItem(item) === true ){
      this.CartDataArray = this.CartDataArray.filter(obj => obj.id !== item.group_id);
      this.decrementBadgeCount();
      this.cart.CartDataArray=this.cart.CartDataArray.filter(obj=>obj.id!== item.group_id);
    }
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


  //increment badge count
  incrementBadgeCount(){
    this.cart.CartBadgeCount = this.cart.CartBadgeCount+1;
    this.CartBadgeCount=this.cart.CartBadgeCount;

  }

  //decrement badge count 
  decrementBadgeCount(){
    if(this.cart.CartBadgeCount !=0 ){
      this.cart.CartBadgeCount = this.cart.CartBadgeCount-1;
      this.CartBadgeCount=this.cart.CartBadgeCount;
    }
  }


  //checking items
  checkItem(item){
    var isAvailable =false;
    for(var i = 0; i < this.cart.CartDataArray.length; i++) {
      if(this.cart.CartDataArray[i].id === item.group_id){
        isAvailable=true;
        break;
      }
    }
    return isAvailable;
  }

  //Items Array 
  ActivateItems(items,idx){
    if(items.qty !=0){
      var i = this.cart.Items.indexOf(items);
      if (i > -1) {

      } else {
        this.cart.Items.push(items);
        items.selected = true;
      }
    }else{

    }
  }

  DeactivateItems(items,idx){
    if(items.qty !=0){
      var i = this.cart.Items.indexOf(items);
      if (i > -1) {
        this.cart.Items.splice(i, 1);
        items.selected = false;

      } else {

      }
    }else{

    }
  }

  //Onbutton click
  onButtonClick(item){
    if(item.qty !=0){
      var i = this.Clicked.indexOf(item);
      if(i>-1){

      }else{
        this.Clicked.push(item);
        this.cart.onButtonClick(item);
        item.Checked = true;
      }

    }else{

    }   
  }



  onCancelClick(item){
    if(item.qty !=0){
      // console.log('s',this.Clicked);
      var i= this.Clicked.indexOf(item);
      if(i> -1){
        this.Clicked.splice(i, 1);
        this.cart.onCancelClick(item);
        item.Checked = false;

      }else{

      }

    }else{

    }

  }

  //To Identify Selected item ,Injecting new propertyName to JSON array
  onToggleSelected() {

    this.ShopItems2.forEach((i) => {
      {i.selected=false;}
      {i.Checked =false;}
      {i.qty=1}
    });

    this.Items.length=0;
    this.Clicked.length=0;
  }


  //checkbox event for click and unclick
  notify(event,item)
  {
    if(item.qty != 0){
    this.select.notify(event,item);
    this.CheckButtonClicked();
    this.First.push(new ObjModel(item));
}
  }

  CheckButtonClicked(){

    if (this.select.SelectArray.length>0) {
      this.buttonClicked=true;
    }else{
      this.buttonClicked =false;
    }


  }


  navigateTolistPage(){
    this.navCtrl.push(ListPage);
  }










}
