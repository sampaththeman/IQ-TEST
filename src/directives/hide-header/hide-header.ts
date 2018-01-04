import { Directive,Input,ElementRef,Renderer } from '@angular/core';

/**
 * Generated class for the HideHeaderDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
 @Directive({
 	selector: '[hide-header]',// Attribute selector
 	host:{
 		'(ionScroll)': 'onContentScroll($event)'
 	}
 })
 export class HideHeaderDirective {

 	headerHeight;
 	scrollContent;
 	@Input("header") header :HTMLElement;

 	constructor(public element:ElementRef,public render:Renderer) {
 		console.log('Hello HideHeaderDirective Directive');
 	}


 	ngOninit(){
 		this.headerHeight =this.header.clientHeight;
 		this.render.setElementStyle(this.header,"webkitTransition","top 700ms");
 		this.scrollContent.element.nativeElement.getElementByclassName("scroll-content")[0];
 		this.render.setElementStyle(this.scrollContent,"webkitTransition","margin-top 700ms");
 	}

 	onContentScroll(event){
 		if(event.scrollTop >56){
 			this.render.setElementStyle(this.header,"top","-56px");
 		}else{
 			this.render.setElementStyle(this.header,"top","0px");
 		}
 	}

 }
