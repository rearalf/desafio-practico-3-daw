import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-modal-detalle',
  templateUrl: './modal-detalle.html',
  styleUrls: ['./modal-detalle.css'],
  standalone: true,
  imports: [CommonModule],
})
export class ModalDetalleComponent {
  @Input() producto: any; //recibe el producto seleccionado
  @Input() visible: boolean = false; //controla si el modal se muestra o se oculta
  @Output() close = new EventEmitter<void>();

  private cartService = new CartService(); //agrega los productos al carrito

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
