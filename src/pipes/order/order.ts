import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the OrderPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
 @Pipe({
 	name: 'order',
 })
 export class OrderPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
   public servfiltered:any[];
   serv2filterd: any[] = [];

   public transform(values: any[], item_name: string) {
   	if (!values || !values.length) return [];
   	if (!item_name) return values;
   	this.servfiltered =values.filter(servl => servl.id==item_name);

   	this.servfiltered.forEach( item => {
   		this.serv2filterd=item.order;
   	});

   	return  this.serv2filterd;
   }
}
