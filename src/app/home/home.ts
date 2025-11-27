import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ModalDetalleComponent } from '../modal/modal-detalle';
import { ProductsService } from '../services/products.service';

/**
 * Se encarga de mostrar la lista de productos,
 * gestionar la carga, la búsqueda, el filtrado por categoría y la visualización de un modal de detalle.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  imports: [CommonModule, FormsModule, ModalDetalleComponent],
  standalone: true,
})
export class HomeComponent {
  // Variable para almacenar el texto para la búsqueda.
  searchText: string = '';
  // Lista de productos obtenidos del servicio.
  products: any[] = [];
  // Indicador de estado de carga.
  loading = true;
  // Almacena mensajes de error.
  error: string | null = null;
  // Lista fija de categorías disponibles para el filtrado.
  categories: string[] = ["men's clothing", "women's clothing", 'jewelery', 'electronics'];
  // Lista de productos mostrados.
  filteredProducts: any[] = [];
  // Almacena la categoría seleccionada.
  categorySelected: string | undefined = undefined;
  // Bandera para controlar la visibilidad del modal de detalle del producto.
  modalVisible: boolean = false;
  // Producto seleccionado para mostrar en el modal de detalle.
  productoSeleccionado: any = null;
  // Instancia del servicio de productos.
  private productsService = new ProductsService();

  /**
   * @param cdr Servicio de detección de cambios de Angular.
   */
  constructor(private cdr: ChangeDetectorRef) {
    this.fetchProducts();
  }

  /**
   * Obtiene la lista completa de productos del servicio.
   */
  async fetchProducts() {
    this.loading = true;
    this.error = null;

    try {
      this.products = await this.productsService.getProducts();
      this.filteredProducts = this.products;
    } catch (err: any) {
      this.error = 'Error al cargar productos';
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  /**
   * Obtiene los productos filtrados por la categoría seleccionada.
   */
  async onSelectCategory(event: any) {
    this.loading = true;
    this.error = null;
    try {
      this.products = await this.productsService.getProducts(event.target.value);
      this.categorySelected = event.target.value;
      this.filteredProducts = this.products;
      this.filterProducts();
    } catch (err: any) {
      this.error = 'Error al cargar productos';
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  /**
   * Filtra la lista de productos visibles basándose en el `searchText`.
   */
  filterProducts() {
    const text = this.searchText.toLowerCase();
    this.filteredProducts = this.products.filter((p) => p.title.toLowerCase().includes(text));
  }

  /**
   * Asigna el producto seleccionado y muestra el modal de detalle.
   */
  abrirModal(producto: any) {
    this.productoSeleccionado = producto;
    this.modalVisible = true;
  }

  /**
   * Oculta el modal de detalle y limpia el producto seleccionado.
   */
  cerrarModal() {
    this.modalVisible = false;
    this.productoSeleccionado = null;
  }
}
