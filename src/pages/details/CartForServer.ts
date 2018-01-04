import {DetailsPage} from '../../pages/details/details';

export class CartForServerModel {
	// group_id:number =null;
    group_items:DetailsPage;

    constructor(data,group_items:DetailsPage){
    	 this.group_items =group_items;

    }

}