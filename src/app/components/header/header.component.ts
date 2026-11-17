import { Component, HostListener, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  readonly cart = inject(CartService);
  readonly wishlist = inject(WishlistService);

  readonly scrolled = signal(false);
  readonly menuOpen = signal(false);

  readonly links = [
    { path: '/', label: 'Início', exact: true },
    { path: '/loja', label: 'Loja', exact: false },
    { path: '/sobre', label: 'Sobre', exact: false },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 10);
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
