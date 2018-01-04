export class SelectModel{

	// id:string = null;
	// userId:string = null ;
	// qty:number =null;
	// price:number=null;
	// img:any =null;


	// constructor(data){

	//     this.id = data.group_id;
	// 	this.userId = data.group_id;
	//     this.qty = data.group_items[0].qty;
	//     this.price =data.group_items[0].price;
	//     this.img = data.group_items[0].picture;

	// }


    catid:number =null;
    catname:string=null;
    itmcode:any=null;
    itmname: any=null;
    itmprice:number =null;
    qty:number=null;
    description:any=null;
    itmimgpath:any=null;
    availableqty:number=null;


    constructor(data){
    	console.log('item',data);
    	this.catid = data.catid;
    	this.catname=data.catname;
    	this.itmcode=data.itmcode;
    	this.itmname=data.itmname;
        this.qty=data.qty;
    	this.itmprice=data.itmprice;
    	this.description=data.description;
    	this.availableqty=data.availableqty;
        this.itmimgpath=data.itmimgpath;
    }


}