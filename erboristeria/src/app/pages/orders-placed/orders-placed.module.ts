import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersPlacedRoutingModule } from './orders-placed-routing.module';
import { OrdersPlacedComponent } from './orders-placed.component';


@NgModule({
  declarations: [
    OrdersPlacedComponent
  ],
  imports: [
    CommonModule,
    OrdersPlacedRoutingModule
  ]
})
export class OrdersPlacedModule { }
