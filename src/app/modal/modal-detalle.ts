import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';

/**
 * Muestra la información detallada de un producto seleccionado y permite agregarlo al carrito.
 */
@Component({
  selector: 'app-modal-detalle',
  templateUrl: './modal-detalle.html',
  styleUrls: ['./modal-detalle.css'],
  standalone: true,
  imports: [CommonModule],
})
export class ModalDetalleComponent {
  // Propiedad de entrada que recibe el objeto del producto seleccionado a mostrar en el modal.
  @Input() producto: any;
  // Propiedad de entrada que controla la visibilidad del modal.
  @Input() visible: boolean = false;
  // Emite un evento al componente padre.
  @Output() close = new EventEmitter<void>();
  // Instancia del servicio de carrito para gestionar la adición de productos.
  private cartService = new CartService();

  cerrar() {
    this.close.emit();
  }
  //verifica el producto que ha sido cargado
  addToCart() {
    if (this.producto) {
      this.cartService.addToCart({ ...this.producto });
      this.cerrar();
    }
  }
}
