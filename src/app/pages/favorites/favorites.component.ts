import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-favorites',
  imports: [RouterLink, ProductCardComponent],
  template: `
    <section class="container page">
      <span class="eyebrow">Favoritos</span>
      <h1 class="section-title">Sua lista de desejos</h1>
      <p class="section-sub">Os produtos que você salvou ficam guardados aqui, mesmo se fechar o navegador.</p>

      @if (wishlist.products().length > 0) {
        <div class="product-grid">
          @for (p of wishlist.products(); track p.id) {
            <app-product-card [product]="p" />
          }
        </div>
      } @else {
        <div class="empty-state">
          <i class="uil uil-heart"></i>
          <h3>Nenhum favorito ainda</h3>
          <p>Toque no coração de um produto para salvá-lo aqui.</p>
          <a routerLink="/loja" class="btn btn-dark">Explorar a loja</a>
        </div>
      }
    </section>
  `,
  styles: `
    .page {
      padding: calc(var(--header-h) + 56px) 0 80px;
      min-height: 70vh;
    }
    .product-grid {
      margin-top: 40px;
    }
  `,
})
export class FavoritesComponent {
  readonly wishlist = inject(WishlistService);
}
