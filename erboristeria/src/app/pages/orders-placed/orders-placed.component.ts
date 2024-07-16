import { Component } from '@angular/core';
import { IOrder } from '../../models/iorder';
import { OrderService } from '../order.service';
import { IordersPlaced } from '../../models/iorders-placed';

@Component({
  selector: 'app-orders-placed',
  templateUrl: './orders-placed.component.html',
  styleUrl: './orders-placed.component.scss'
})
export class OrdersPlacedComponent {
  orders: IordersPlaced[] = [];
  errorMessage: string = '';

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.orderService.getOrders().subscribe({
      next: (data) => {
        this.orders = data;
      },
      error: (err) => {
        this.errorMessage = err.message;
      }
    });
  }
}

