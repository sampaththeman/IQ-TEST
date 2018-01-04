import { Component,ViewChild } from '@angular/core';
import { Http,Response,RequestOptions,Headers } from '@angular/http';
import { Platform,NavParams,Slides, } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { DetailsPage } from  '../details/details';
import { TabsPage } from  '../tabs/tabs';
import { FormControl } from '@angular/forms';
import { CartProvider } from '../../providers/cart/cart';
import {FinalCartForServerProvider} from '../../providers/final-cart-for-server/final-cart-for-server';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Storage } from '@ionic/storage';
import { OfferLoadPage }  from '../../pages/offer-load/offer-load';
import { HomeSearchPage} from '../../pages/home-search/home-search';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/Rx';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  name;
  public ShopItems: any;
  public SortedArray:any; //sorted array 
  searchTerm: string = '';
  searchControl: FormControl;
  searching: any = false;
  CartBadgeCount : number = 0; // default 0
  SearchArray = [];
  ImageArray=[];
  Test =[];
  public SuggestionArray:any;
  public temp:any;
  user_id;
  gengder;


  @ViewChild(Slides) slider: Slides;


  constructor(public loading: LoadingController,private storage: Storage,private http:Http,public navCtrl: NavController,private platform:Platform,public navParams: NavParams,public Cart:CartProvider,public FinalCart:FinalCartForServerProvider) {

    this.storage.ready()   
    .then(() => this.load())
    .then(()=> this.Cart.load())
    .then(()=> this.temp_activities())
    .then(() => this.loadSliderImg())
    .then(()=>this.load_suggestions())
    // .then(()=> this.onToggleSelected())

    this.name=navParams.data.item; 
    this.searchControl = new FormControl();

  }


  public temp_activities(){

    this.storage.get('profile_data').then((val) => {
      let profile=JSON.parse(val);
      // console.log(profile);
      this.gengder = profile.gender;
      this.user_id = profile.user_id;

    });

  }



//eqal function for NgInit()
ionViewWillEnter() {
  this.CartBadgeCount =  this.FinalCart.CartBadgeCount;
  this.CheckImageArrayLength();
  this.Cart.load();
  this.load();


}

ionViewDidLeave(){
  this.StopAutoPlay();
}

public CheckImageArrayLength(){
  if(this.ImageArray.length > 0){
    this.slider.startAutoplay();
  }else{
  }
}

public StopAutoPlay(){
  if(this.ImageArray.length > 0){
    this.slider.stopAutoplay();
  }else{

  }
}

public loadAvatar(){
 var catName="Food and Drink";
 this.navCtrl.push(HomeSearchPage,{item:catName});
}
public loadAvatar1(){
 var catName="Home Care";
 this.navCtrl.push(HomeSearchPage,{item:catName});
}

public loadAvatar2(){
 var catName="Personal Care";
 this.navCtrl.push(HomeSearchPage,{item:catName});
}

public loadAvatar3(){
 var catName="Canned";
 this.navCtrl.push(HomeSearchPage,{item:catName});
}






doRefresh(refresher) {
  // console.log('Begin async operation', refresher);
  this.loadSliderImg();

  setTimeout(() => {
    // console.log('Async operation has ended');
    refresher.complete();
  }, 2000);
}


public load_suggestions(){

  var base_url="http://snap.iqmedialabs.com/suggessions";



  var Obj={
    user_id:this.user_id,
    gender:this.gengder

  }


  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });


  this.http.post(base_url,JSON.stringify(Obj),options)
  .subscribe(data => {
    let body = data.json()
    console.log(body);
    this.SuggestionArray= body;

    this.onToggleSelected();

    // console.log(this.SuggestionArray);


  }, error => {

  });




}



public loadSliderImg(){
  var base_url="http://snap.iqmedialabs.com/slider_2";

  this.http.get(base_url).map(res=>res.json()).subscribe(data=>{
    let items = data;
    // console.log('Items',items);
    this.ImageArray=data;
    if(this.ImageArray.length>0){

    }
  })

  this.storage.get('Slider').then((val) => {

  });

}

//access search page
public search_page(){
  this.navCtrl.push(HomeSearchPage);
}


//Load Data
load() {
  if (this.ShopItems) {
            // already loaded data

            var length = JSON.parse(localStorage.getItem("usr_bsk_length"));
            var tmpl;
            var base_url="http://snap.iqmedialabs.com/user_baskets";

            this.http.get(base_url).map(res => res.json()).subscribe(data => {
              let items = data;
              this.temp=items;
              tmpl=this.temp.length;
              


              if(tmpl>length){
                // console.log('update found');
                this.ShopItems=this.temp;
                this.setItemsStorage(this.ShopItems);

              }else{
                // console.log('load from cache');
                return Promise.resolve(this.ShopItems);
              }  
            },
            err => {
              console.log('error in Json');
            });
          }

        // don't have the data yet
        return new Promise(resolve => {

          var base_url="http://snap.iqmedialabs.com/user_baskets";

          // let loading = this.loading.create({
          //   content: 'Loading User Baskets .. Please wait...',
          //   spinner: 'crescent'
          // });
          // loading.present();


          this.http.get(base_url).map(res => res.json()).subscribe(data => {
            let items = data;
            this.ShopItems = data;
            resolve(this.ShopItems);
            localStorage.setItem('usr_bsk_length', JSON.stringify(this.ShopItems.length));
            this.setItemsStorage(this.ShopItems);
            // loading.dismiss();

          },
          err => {
            console.log('error in Json');

          });
          
        });
      }



      setItemsStorage(item){
        this.storage.set('user_baskets_storage', JSON.stringify(item));
      }


      public Listitem(item)
      {
        var index = this.ShopItems.indexOf(item);
        this.navCtrl.push(DetailsPage,{item:item,index});
      }

      initializeItems() {
        var base_url="http://snap.iqmedialabs.com/user_baskets";

        this.http.get(base_url).map(res => res.json()).subscribe(data => {
          let items = data;
          this.ShopItems=items;

        },
        err => {
          console.log('error in Json');
        });


         //this.load();
        // this.storage.get('user_baskets_storage').then((value) => {
        //   console.log(value);
        //   return JSON.parse(value);
        // });

}


public navigate_offer(item){
  var index = this.SuggestionArray.indexOf(item);
  this.navCtrl.push(OfferLoadPage,{item:item,index});
}



public onToggleSelected() {

  this.SuggestionArray.forEach((i) => {
    {i.selected=false;}
    {i.Checked =false;}
    {i.qty=1}
    console.log(this.SuggestionArray);
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


onCancel(ev:any){
  console.log('f');
  this.load();
}




getItems1(ev: any) {

// this.initializeItems();
let val = ev.target.value;
 // if the value is an empty string don't filter the items

 if (val && val.trim() != '') {

   let matches: any[]= this.ShopItems.map((item)=>{
     if(item && item.group_items && item.group_items.length > 0){
       item.group_items = item.group_items.filter(brand=>{
         if(!brand.name){
           this.initializeItems();
         }else{
           return (brand.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
         }

       });
     }


     return item;
      // return (item.group_items[0].name.toLowerCase().indexOf(val.toLowerCase()) > -1);;   
    })

      // this.ShopItems = this.ShopItems.filter((item) => {
      //   return (item.group_items[0].code.toLowerCase().indexOf(val.toLowerCase()) > -1);
      // })


}
this.initializeItems();
}


  // Sorting the array 
  onarraySorted(){
    this.ShopItems.sort( function(name1, name2) {
      if ( name1.sort_id < name2.sort_id ){
        return -1;
      }else if( name1.sort_id > name2.sort_id ){
        return 1;
      }else{
        return 0;  
      }
    });  
//setting localstorage
localStorage.setItem('ShopItems', JSON.stringify(this.ShopItems));

}










}
