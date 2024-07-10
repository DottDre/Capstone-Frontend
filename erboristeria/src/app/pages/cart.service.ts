import { Injectable } from '@angular/core';
import { Iproduct } from '../models/iproduct';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart = new BehaviorSubject<Iproduct[]>([]);
  cart$ = this.cart.asObservable();

  addToCart(product: Iproduct) {
    const currentCart = this.cart.value;
    currentCart.push(product);
    this.cart.next(currentCart);
  }

  removeFromCart(productId: number) {
    const currentCart = this.cart.value.filter(product => product.id !== productId);
    this.cart.next(currentCart);
  }

  getCart() {
    return this.cart.value;
  }

  clearCart() {
    this.cart.next([]);
  }
}
