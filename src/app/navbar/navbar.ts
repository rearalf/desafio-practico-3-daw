import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  standalone: true,
})
export class NavbarComponent {
  totalCart: number = 0;
  itemCount: number = 0;
  private cartService = new CartService();

  constructor() {
    this.updateCartInfo();
  }

  updateCartInfo() {
    const cart = this.cartService.getCart();
    this.totalCart = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }
}
