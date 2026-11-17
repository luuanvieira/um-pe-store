import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService, FREE_SHIPPING_FROM } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-cart-drawer',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart-drawer.component.html',
  styleUrl: './cart-drawer.component.css',
})
export class CartDrawerComponent {
  readonly cart = inject(CartService);
  private readonly toast = inject(ToastService);

  readonly freeShippingFrom = FREE_SHIPPING_FROM;

  progress(): number {
    return Math.min(100, (this.cart.subtotal() / FREE_SHIPPING_FROM) * 100);
  }

  checkout(): void {
    this.cart.clear();
    this.cart.close();
    this.toast.show('Pedido realizado! (simulação)', 'uil-check-circle');
  }
}
