import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product';

/** Estado de interface compartilhado: produto aberto no modal de detalhes. */
@Injectable({ providedIn: 'root' })
export class UiService {
  readonly selectedProduct = signal<Product | null>(null);

  openProduct(product: Product): void {
    this.selectedProduct.set(product);
  }

  closeProduct(): void {
    this.selectedProduct.set(null);
  }
}
