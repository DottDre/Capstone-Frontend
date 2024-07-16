import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersPlacedComponent } from './orders-placed.component';

const routes: Routes = [{ path: 'ordersPlaced', component: OrdersPlacedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersPlacedRoutingModule { }
