import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../services/products.service';
import { FormsModule } from '@angular/forms';
import { ModalDetalleComponent } from "../modal/modal-detalle";

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  imports: [CommonModule, FormsModule, ModalDetalleComponent],
  standalone: true,
})
export class HomeComponent {
  searchText: string = '';
  products: any[] = [];
  loading = true;
  error: string | null = null;
  categories: string[] = ["men's clothing", "women's clothing", 'jewelery', 'electronics'];
  filteredProducts: any[] = [];
  categorySelected: string | undefined = undefined;

  modalVisible: boolean = false;
  productoSeleccionado: any = null;

  private productsService = new ProductsService();
  constructor(private cdr: ChangeDetectorRef) {
    this.fetchProducts();
  }

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

  filterProducts() {
    const text = this.searchText.toLowerCase();
    this.filteredProducts = this.products.filter((p) => p.title.toLowerCase().includes(text));
  }

  abrirModal(producto: any) {
    this.productoSeleccionado = producto;
    this.modalVisible = true;
  }

  cerrarModal() {
    this.modalVisible = false;
    this.productoSeleccionado = null;
  }
}
