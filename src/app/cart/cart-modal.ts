import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.html',
  styleUrls: ['./cart-modal.css'],
  standalone: true,
  imports: [CommonModule],
})
export class CartModalComponent {
  @Output() close = new EventEmitter<void>();
  cart: any[] = [];
  total: number = 0;
  private cartService = new CartService();

  constructor() {
    this.loadCart();
    window.addEventListener('storage', () => this.loadCart());
  }

  loadCart() {
    this.cart = this.cartService.getCart();
    this.total = this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  closed() {
    this.close.emit();
  }

  pay() {
    Swal.fire({
      title: 'Transacción exitosa!',
      text: 'Su pago se realizo con exito',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
    });
    this.closed();
  }
}
