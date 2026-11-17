import { Component, HostListener, effect, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { UiService } from '../../services/ui.service';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-modal',
  imports: [CurrencyPipe],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.css',
})
export class ProductModalComponent {
  readonly ui = inject(UiService);
  readonly cart = inject(CartService);
  readonly wishlist = inject(WishlistService);

  readonly size = signal<number | null>(null);
  readonly qty = signal(1);
  readonly sizeError = signal(false);

  constructor() {
    // Sempre que outro produto for aberto, limpa a seleção anterior
    effect(() => {
      this.ui.selectedProduct();
      this.size.set(null);
      this.qty.set(1);
      this.sizeError.set(false);
    });
  }

  @HostListener('document:keydown.escape')
  close(): void {
    this.ui.closeProduct();
  }

  selectSize(size: number): void {
    this.size.set(size);
    this.sizeError.set(false);
  }

  changeQty(delta: number): void {
    this.qty.update((q) => Math.min(10, Math.max(1, q + delta)));
  }

  addToCart(product: Product): void {
    const size = this.size();
    if (size === null) {
      this.sizeError.set(true);
      return;
    }
    this.cart.add(product, size, this.qty());
    this.close();
    this.cart.open();
  }

  stars(rating: number): number[] {
    return [1, 2, 3, 4, 5].map((i) => (rating >= i ? 1 : rating >= i - 0.5 ? 0.5 : 0));
  }
}
