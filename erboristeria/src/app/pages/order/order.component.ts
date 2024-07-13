import { Component } from '@angular/core';
import { Iproduct } from '../../models/iproduct';
import { CartService } from '../cart.service';
import { OrderService } from '../order.service';
import { IOrderItem } from '../../models/iorder-item';
import { IOrder } from '../../models/iorder';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  cartItems: Iproduct[] = [];
  userId: number = 1; // Ottieni l'ID utente dal tuo sistema di autenticazione

  constructor(private cartService: CartService, private orderService: OrderService) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCart();
  }

  placeOrder() {
    const orderItems: IOrderItem[] = this.cartItems.map(item => ({
      productId: item.id,
      quantity: 1, // Aggiusta la quantità secondo il tuo caso d'uso
      price: item.price
    }));

    const orderRequest: IOrder = {
      userId: this.userId,
      orderItems: orderItems
    };

    console.log('Order request:', orderRequest); // Aggiungi questo log

    this.orderService.createOrder(orderRequest).subscribe({
      next: (orderResponse) => {
        console.log('Order placed successfully', orderResponse);
        this.cartService.clearCart();
      },
      error: (error) => {
        console.error('Error placing order', error);
      }
    });
  }
}
