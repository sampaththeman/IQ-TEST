import {ItemDetails} from '../../pages/list/item_details';


export class ObjModel{

	// group_id:number =null;
 //    group_items:ItemDetails;


    // constructor(data, group_items:ItemDetails){
    // 	this.group_id = data.group_id;
    	
    // 	 this.group_items =group_items;
    // }

    catid:number =null;
    catname:string=null;
    itmcode:any=null;
    itmname: any=null;
    itmprice:number =null;
    qty:number=null;
    description:any=null;
    availableqty:number=null;


    constructor(data){
    	console.log('item',data);
    	this.catid = data.catid;
    	this.catname=data.catname;
    	this.itmcode=data.itmcode;
    	this.itmname=data.itmprice;
    	this.itmprice=data.itmprice;
    	this.description=data.description;
        this.qty=data.qty;
    	this.availableqty=data.availableqty;
    }


}