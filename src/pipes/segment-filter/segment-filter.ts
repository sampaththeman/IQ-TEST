import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SegmentFilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'segmentFilter',
})
export class SegmentFilterPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  public servfiltered:any[];

  public transform(values: any[], item_name: string) {
    if (!values || !values.length) return [];
    if (!item_name) return values;
    this.servfiltered =values.filter(servl => servl.catname==item_name);
    
    this.servfiltered.forEach((i) => {
      {i.selected=false;}
      {i.Checked =false;}
    });

    return  this.servfiltered;
  }




}
