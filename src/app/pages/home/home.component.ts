import { Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { PRODUCTS } from '../../data/products';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CurrencyPipe, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  readonly ui = inject(UiService);

  /** Produtos que giram no destaque do topo */
  readonly heroProducts = [PRODUCTS[0], PRODUCTS[1], PRODUCTS[3], PRODUCTS[4]];
  readonly featured = PRODUCTS.filter((p) => p.badge).slice(0, 4);
  readonly current = signal(0);

  readonly categories = [
    { name: 'Esporte', text: 'Desempenho e amortecimento para treinar sem limites.', image: PRODUCTS[0].image, tint: '#dcf1f8' },
    { name: 'Casual', text: 'Conforto e estilo para acompanhar o seu dia a dia.', image: PRODUCTS[4].image, tint: '#e0eaf3' },
    { name: 'Social', text: 'Elegância em couro para as ocasiões especiais.', image: PRODUCTS[7].image, tint: '#f3e6da' },
  ];

  readonly benefits = [
    { icon: 'uil-truck', title: 'Frete grátis', text: 'Em compras acima de R$ 299 para todo o Brasil.' },
    { icon: 'uil-redo', title: 'Troca fácil', text: 'Não serviu? Você tem 30 dias para trocar sem custo.' },
    { icon: 'uil-shield-check', title: 'Compra segura', text: 'Pagamento protegido e parcelamento em até 3x sem juros.' },
    { icon: 'uil-comment-dots', title: 'Fale conosco', text: 'Dúvidas sobre produtos ou pedidos? Nosso time responde rápido.' },
  ];

  readonly marquee = ['Esporte', 'Casual', 'Social', 'Conforto', 'Estilo', 'Performance'];

  constructor() {
    const timer = setInterval(() => this.next(), 4500);
    inject(DestroyRef).onDestroy(() => clearInterval(timer));
  }

  next(): void {
    this.current.update((i) => (i + 1) % this.heroProducts.length);
  }

  goTo(index: number): void {
    this.current.set(index);
  }
}
