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
  @Input() producto: any;
  @Input() visible: boolean = false;
  @Output() close = new EventEmitter<void>();

  private cartService = new CartService();

  cerrar() {
    this.close.emit();
  }

  addToCart() {
    if (this.producto) {
      this.cartService.addToCart({ ...this.producto });
      this.cerrar();
    }
  }
}
