import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { PRODUCTS } from '../../data/products';
import { Category } from '../../models/product';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

type Filter = 'Todos' | Category;
type Sort = 'relevancia' | 'menor' | 'maior' | 'nome';

@Component({
  selector: 'app-shop',
  imports: [FormsModule, ProductCardComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent {
  private readonly router = inject(Router);

  readonly filters: Filter[] = ['Todos', 'Esporte', 'Casual', 'Social'];
  readonly category = signal<Filter>('Todos');
  readonly search = signal('');
  readonly sort = signal<Sort>('relevancia');

  readonly results = computed(() => {
    const term = this.normalize(this.search());
    const list = PRODUCTS.filter(
      (p) =>
        (this.category() === 'Todos' || p.category === this.category()) &&
        this.normalize(p.name + ' ' + p.category).includes(term),
    );

    switch (this.sort()) {
      case 'menor':
        return [...list].sort((a, b) => a.price - b.price);
      case 'maior':
        return [...list].sort((a, b) => b.price - a.price);
      case 'nome':
        return [...list].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return list;
    }
  });

  constructor() {
    inject(ActivatedRoute)
      .queryParamMap.pipe(takeUntilDestroyed())
      .subscribe((params) => {
        const cat = params.get('categoria');
        this.category.set(this.filters.find((f) => f === cat) ?? 'Todos');
      });
  }

  count(filter: Filter): number {
    return filter === 'Todos' ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === filter).length;
  }

  setCategory(filter: Filter): void {
    this.router.navigate([], {
      queryParams: { categoria: filter === 'Todos' ? null : filter },
      queryParamsHandling: 'merge',
    });
  }

  clearFilters(): void {
    this.search.set('');
    this.sort.set('relevancia');
    this.setCategory('Todos');
  }

  private normalize(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .trim();
  }
}
