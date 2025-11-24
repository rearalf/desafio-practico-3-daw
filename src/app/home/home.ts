import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  imports: [CommonModule],
  standalone: true,
})
export class HomeComponent {
  products: any[] = [];
  loading = true;
  error: string | null = null;

  private productsService = new ProductsService();
  constructor(private cdr: ChangeDetectorRef) {
    this.fetchProducts();
  }


  async fetchProducts() {
    this.loading = true;
    this.error = null;
    try {
      this.products = await this.productsService.getProducts();
    } catch (err: any) {
      this.error = 'Error al cargar productos';
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }
}
