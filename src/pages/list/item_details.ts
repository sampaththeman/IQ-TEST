export class ItemDetails{

	   id:string = null;
	   code:string = null ;
	   description:any =null;
	   name:any=null;
	   price:any =null;
	   picture:any= null;
	   qty:any=null;
	   active:any=null;

  constructor(data){
  	console.log('ss',data);
	  this.id=data.group_items[0].id;
    this.code =data.group_items[0].code;
    this.description=data.group_items[0].description;
    this.name=data.group_items[0].name;
    this.price=data.group_items[0].price;
    this.picture=data.group_items[0].picture;
    this.qty=data.group_items[0].qty;
    this.active=data.group_items[0].active;
  }


}