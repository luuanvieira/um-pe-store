import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartDrawerComponent } from './components/cart-drawer/cart-drawer.component';
import { ProductModalComponent } from './components/product-modal/product-modal.component';
import { ToastComponent } from './components/toast/toast.component';
import { CartService } from './services/cart.service';
import { UiService } from './services/ui.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CartDrawerComponent, ProductModalComponent, ToastComponent],
  template: `
    <app-header />
    <main>
      <router-outlet />
    </main>
    <app-footer />

    <app-cart-drawer />
    <app-product-modal />
    <app-toast />
  `,
})
export class AppComponent {
  private readonly document = inject(DOCUMENT);
  private readonly cart = inject(CartService);
  private readonly ui = inject(UiService);

  constructor() {
    // Trava o scroll da página quando o carrinho ou o modal estão abertos
    effect(() => {
      const locked = this.cart.isOpen() || this.ui.selectedProduct() !== null;
      this.document.body.classList.toggle('no-scroll', locked);
    });
  }
}
