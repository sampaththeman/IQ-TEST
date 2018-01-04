import { NgModule } from '@angular/core';
import { SegmentFilterPipe } from './segment-filter/segment-filter';
import { OrderPipe } from './order/order';
import { NotificatonsPipe } from './notificatons/notificatons';
@NgModule({
	declarations: [SegmentFilterPipe,
    OrderPipe,
    NotificatonsPipe],
	imports: [],
	exports: [SegmentFilterPipe,
    OrderPipe,
    NotificatonsPipe]
})
export class PipesModule {}
