import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-detalle',
  templateUrl: './modal-detalle.html',
  styleUrls: ['./modal-detalle.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ModalDetalleComponent {
  @Input() producto: any;
  @Input() visible: boolean = false;
  @Output() close = new EventEmitter<void>();

  cerrar() {
    this.close.emit();
  }
}
