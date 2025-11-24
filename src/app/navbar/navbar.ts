import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartModalComponent } from '../cart/cart-modal';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  standalone: true,
  imports: [CommonModule, CartModalComponent],
})
export class NavbarComponent {
  totalCart: number = 0;
  itemCount: number = 0;
  private cartService = new CartService();

  cartModalVisible: boolean = false;

  constructor() {
    this.updateCartInfo();
  }
  abrirCartModal() {
    this.cartModalVisible = true;
  }

  cerrarCartModal() {
    this.cartModalVisible = false;
  }

  updateCartInfo() {
    const cart = this.cartService.getCart();
    this.totalCart = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }
}
