import { Component,Input, ElementRef, Renderer,ContentChildren } from '@angular/core';
import { Item } from 'ionic-angular';

/**
 * Generated class for the ExpandableHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'expandable-header',
  templateUrl: 'expandable-header.html'
})
export class ExpandableHeaderComponent {


  @Input('scrollArea') scrollArea: any;
  @Input('headerHeight') headerHeight: number;

  @ContentChildren(Headers, {read: ElementRef}) children: any;

  newHeaderHeight: any;

  constructor(public element:ElementRef,public render:Renderer) {

  }


ngAfterViewInit(){

    this.render.setElementStyle(this.element.nativeElement, 'height', this.headerHeight + 'px');

    this.scrollArea.ionScroll.subscribe((ev) => {
      this.resizeHeader(ev);
    });

  }

  resizeHeader(ev){

    ev.domWrite(() => {

      this.newHeaderHeight = this.headerHeight - ev.scrollTop;

      if(this.newHeaderHeight < 0){
        this.newHeaderHeight = 0;
      }   

      this.render.setElementStyle(this.element.nativeElement, 'height', this.newHeaderHeight + 'px');

      this.children.forEach((child) => {

        let headerElement = child.nativeElement;
        let totalHeight = headerElement.offsetTop + headerElement.clientHeight;
 
        if(totalHeight > this.newHeaderHeight && !headerElement.isHidden){
          headerElement.isHidden = true;
          this.render.setElementStyle(headerElement, 'opacity', '0');
        } else if (totalHeight <= this.newHeaderHeight && headerElement.isHidden) {
          headerElement.isHidden = false;
          this.render.setElementStyle(headerElement, 'opacity', '0.7');
        }

      });

    });

  }


}
