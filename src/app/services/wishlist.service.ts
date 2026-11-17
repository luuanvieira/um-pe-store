import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { Product } from '../models/product';
import { PRODUCTS } from '../data/products';
import { loadFromStorage, saveToStorage } from './storage';
import { ToastService } from './toast.service';

const STORAGE_KEY = 'umpe.wishlist';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private readonly toast = inject(ToastService);

  readonly ids = signal<number[]>(loadFromStorage<number[]>(STORAGE_KEY, []));
  readonly products = computed(() => PRODUCTS.filter((p) => this.ids().includes(p.id)));
  readonly count = computed(() => this.ids().length);

  constructor() {
    effect(() => saveToStorage(STORAGE_KEY, this.ids()));
  }

  has(product: Product): boolean {
    return this.ids().includes(product.id);
  }

  toggle(product: Product): void {
    if (this.has(product)) {
      this.ids.update((ids) => ids.filter((id) => id !== product.id));
      this.toast.show(`${product.name} removido dos favoritos`, 'uil-heart-break');
    } else {
      this.ids.update((ids) => [...ids, product.id]);
      this.toast.show(`${product.name} salvo nos favoritos`, 'uil-heart');
    }
  }
}
