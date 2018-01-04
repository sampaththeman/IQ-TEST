import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the NotificatonsPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'notificatons',
})
export class NotificatonsPipe implements PipeTransform {


   public servfiltered:any[];
   serv2filterd: any[] = [];

   public transform(values: any[], item_name: string) {
   	if (!values || !values.length) return [];
   	if (!item_name) return values;
   	this.servfiltered =values.filter(servl => servl.orderid==item_name);

   	this.servfiltered.forEach( item => {
   		this.serv2filterd=item.notifications;
   	});

   	return  this.serv2filterd;
   }

}
