import { Component, inject, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../models/product';
import { UiService } from '../../services/ui.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  readonly product = input.required<Product>();

  readonly ui = inject(UiService);
  readonly wishlist = inject(WishlistService);

  toggleWish(event: Event): void {
    event.stopPropagation();
    this.wishlist.toggle(this.product());
  }

  discount(p: Product): number {
    return p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  }
}
