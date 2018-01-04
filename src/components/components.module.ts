import { NgModule } from '@angular/core';
import { AccordianComponent } from './accordian/accordian';
import { ExpandableHeaderComponent } from './expandable-header/expandable-header';
@NgModule({
	declarations: [AccordianComponent,
    ExpandableHeaderComponent],
	imports: [],
	exports: [AccordianComponent,
    ExpandableHeaderComponent]
})
export class ComponentsModule {}
