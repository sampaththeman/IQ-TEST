

export class CartForServerDetails{
	id:string = null;
	group_id:string=null;
	itmcode:string = null ;
	description:any =null;
	name:any=null;
	itmprice:any =null;
	picture:any= null;
	amount:any=null;
	active:any=null;
	


	constructor(data){
		this.id=data.id;
		this.group_id=data.group_id;
		this.itmcode =data.code;
		this.description=data.description;
		this.name=data.name;
		this.itmprice=data.itemprice;
		this.picture=data.picture;
		this.amount=data.qty;
		this.active=data.active;
	}


}