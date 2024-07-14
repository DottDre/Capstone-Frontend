import { Component } from '@angular/core';
import { Iproduct } from '../../models/iproduct';
import { CartService } from '../cart.service';
import { OrderService } from '../order.service';
import { IOrderItem } from '../../models/iorder-item';
import { IOrder } from '../../models/iorder';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderConfirmationModalComponent } from '../../order-confirmation-modal/order-confirmation-modal.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  cartItems: Iproduct[] = [];
  userId: number = 1; // Ottieni l'ID utente dal tuo sistema di autenticazione
  total: number = 0;
  constructor(private cartService: CartService, private orderService: OrderService,  private modalService: NgbModal) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCart();
    this.calculateTotal();
  }
  calculateTotal() {
    this.total = this.cartItems.reduce((acc, item) => acc + item.price, 0);
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
        // Apri il modale di conferma dopo 2 secondi
        setTimeout(() => {
          this.openOrderConfirmationModal(true);
        }, 1000);
        this.cartService.clearCart();
      },
      error: (error) => {
        console.error('Error placing order', error);
        // Apri il modale di conferma dopo 2 secondi
        setTimeout(() => {
          this.openOrderConfirmationModal(false);
        }, 1000);
        this.cartService.clearCart();
      }
    });
  }
  openOrderConfirmationModal(successful: boolean) {
    const modalRef = this.modalService.open(OrderConfirmationModalComponent, { centered: true });
    modalRef.componentInstance.successful = successful; // Passa il flag di successo al modale

    modalRef.result.then((result) => {
      console.log('Modal closed with result:', result);
    }, (reason) => {
      console.log('Modal dismissed with reason:', reason);
    });
  }
}

