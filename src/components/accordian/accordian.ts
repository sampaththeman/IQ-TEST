import { Component,ViewChild,OnInit,Renderer,Input } from '@angular/core';

/**
 * Generated class for the AccordianComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
 @Component({
 	selector: 'accordian',
 	templateUrl: 'accordian.html'
 })
 export class AccordianComponent implements OnInit{

 	text: string;

 	accordianExpanded =false;
 	icon:string ="arrow-forward";


 	@ViewChild("cc") cardContent:any;
    @Input('title') title:string;
    @Input()

 	ngOnInit(){
    this.renderer.setElementStyle(this.cardContent.nativeElement,"webkitTransition","max-height 500ms ,padding 500ms");
 	}


 	constructor( public renderer:Renderer) {

 	}

 	toggleAccordian(){
 		if(this.accordianExpanded){
 			this.renderer.setElementStyle(this.cardContent.nativeElement,"max-height","0px");
 			this.renderer.setElementStyle(this.cardContent.nativeElement,"padding","0px 16px");
 		}else{
             this.renderer.setElementStyle(this.cardContent.nativeElement,"max-height","1000px");
             this.renderer.setElementStyle(this.cardContent.nativeElement,"padding","13px 16px");
 		}
 		this.accordianExpanded =! this.accordianExpanded;
 		   this.icon =this.icon=="arrow-forward" ? "arrow-down" : "arrow-forward";
 	}

 }
