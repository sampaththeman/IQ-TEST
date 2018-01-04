/*  Data model definition for cart  - Sampath Dissanayake */

export class CartDataModel{

	id:string = null;
	userId:string = null ;
	qty:number =null;
	price:number=null;
	img : any = null;


	constructor(data){

		this.id = data.group_id;
		this.userId = data.group_id;
	    this.qty = data.group_items[0].qty;
	    this.price =data.group_items[0].price;
	    this.img = data.group_items[0].picture;


	}
}