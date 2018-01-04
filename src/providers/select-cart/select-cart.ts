import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {SelectModel} from '../../pages/about/SelectModel'

/*
  Generated class for the SelectCartProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
  */
  @Injectable()
  export class SelectCartProvider {
  	//Select Model

  	SelectArray : Array<SelectModel> = new Array <SelectModel>();
  	Clicked:any=[];
  	Items:any=[];
    public buttonClicked: boolean = false;
    constructor(public http: Http) {

    }


    // Cart Data Model

    notify(event,item)
    {

      console.log(this.SelectArray);
      if(item.qty !=0){
        var i = this.Clicked.indexOf(item);
        if(i>-1){
          this.Clicked.splice(i, 1);
          item.Checked = false;
          this.setRemoveItems(item);
          this.DeactivateItems(item);


        }else{
          this.Clicked.push(item);
          item.Checked = true;
          this.setCartItems(item);
          this.ActivateItems(item);
        }

      }else{

      }     
    }


    set_qty(item){
      if(item.qty !=0 && this.checkItem(item)){
              for(var i = 0; i < this.SelectArray.length; i++) {
        if(this.SelectArray[i].itmcode === item.itmcode){
            this.SelectArray[i].qty === item.qty;
            console.log(this.SelectArray[i]);
          break;
        }
      }
      }
    }


    //checking items
    checkItem(item){
      console.log('checkingItem',this.SelectArray);
      var isAvailable =false;
      for(var i = 0; i < this.SelectArray.length; i++) {
        if(this.SelectArray[i].itmcode === item.itmcode){
          isAvailable=true;
          break;
        }
      }
      return isAvailable;
    }



    //add items to cart 
    setCartItems(item:any){
      if(!this.checkItem(item) && item.qty !=0){
        this.SelectArray.push( new SelectModel(item));
      }
    }



    //remove items from cart 
    setRemoveItems(item:any){   
      if(this.checkItem(item) === true ){
        this.SelectArray = this.SelectArray.filter(obj => obj.itmcode !== item.itmcode);
      }
    }


    //Items Array 
    ActivateItems(items){
      if(items.qty !=0){
        var i = this.Items.indexOf(items);
        if (i > -1) {

        } else {
          this.Items.push(items);
          items.selected = true;
        }
      }else{

      }
    }

    DeactivateItems(items){
      if(items.qty !=0){
        var i = this.Items.indexOf(items);
        if (i > -1) {
          this.Items.splice(i, 1);
          items.selected = false;

        } else {

        }
      }else{

      }
    }

    


























  }
