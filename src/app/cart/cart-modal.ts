import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

import { CartService } from '../services/cart.service';

/**
 * El modal del carrito de compras.
 * Visualizar los productos agregados, calcular el total.
 */

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.html',
  styleUrls: ['./cart-modal.css'],
  standalone: true,
  imports: [CommonModule],
})
export class CartModalComponent {
  // Emite un evento al componente padre para solicitar el cierre del modal.
  @Output() close = new EventEmitter<void>();
  // Lista de los productos agregados al carrito.
  cart: any[] = [];
  // Total de la compra.
  total: number = 0;
  // Inyección de dependencia del servicio de carrito.
  private cartService = new CartService();

  /**
   * Carga los productos del carrito al inicializar y suscribe a eventos de 'storage'
   * para recargar el carrito si hay cambios en el almacenamiento local desde otra pestaña/ventana.
   */
  constructor() {
    this.loadCart();
    window.addEventListener('storage', () => this.loadCart());
  }

  // Carga los productos del servicio de carrito y calcula el total de la compra.
  loadCart() {
    this.cart = this.cartService.getCart();
    this.total = this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  // Emite el evento 'close' para que el componente padre lo gestione.
  closed() {
    this.close.emit();
  }

  // Muestra una notificación de éxito y cierra el modal.
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

  // Elimina una unidad de un producto específico del carrito.
  removeOne(productId: number) {
    this.cartService.removeProductQuantity(productId, 1);
    this.loadCart();
  }
}
