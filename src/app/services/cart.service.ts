import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { CartItem, Product } from '../models/product';
import { PRODUCTS } from '../data/products';
import { loadFromStorage, saveToStorage } from './storage';
import { ToastService } from './toast.service';

interface StoredItem {
  id: number;
  size: number;
  qty: number;
}

const STORAGE_KEY = 'umpe.cart';
export const FREE_SHIPPING_FROM = 299;
const SHIPPING_PRICE = 19.9;

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly toast = inject(ToastService);

  readonly items = signal<CartItem[]>(this.restore());
  readonly isOpen = signal(false);

  readonly count = computed(() => this.items().reduce((sum, item) => sum + item.qty, 0));
  readonly subtotal = computed(() =>
    this.items().reduce((sum, item) => sum + item.product.price * item.qty, 0),
  );
  readonly shipping = computed(() =>
    this.subtotal() === 0 || this.subtotal() >= FREE_SHIPPING_FROM ? 0 : SHIPPING_PRICE,
  );
  readonly total = computed(() => this.subtotal() + this.shipping());
  readonly missingForFreeShipping = computed(() => Math.max(0, FREE_SHIPPING_FROM - this.subtotal()));

  constructor() {
    effect(() => {
      const data: StoredItem[] = this.items().map((i) => ({ id: i.product.id, size: i.size, qty: i.qty }));
      saveToStorage(STORAGE_KEY, data);
    });
  }

  add(product: Product, size: number, qty = 1): void {
    this.items.update((items) => {
      const existing = items.find((i) => i.product.id === product.id && i.size === size);
      if (existing) {
        return items.map((i) => (i === existing ? { ...i, qty: i.qty + qty } : i));
      }
      return [...items, { product, size, qty }];
    });
    this.toast.show(`${product.name} (tam. ${size}) adicionado ao carrinho`, 'uil-shopping-bag');
  }

  changeQty(item: CartItem, delta: number): void {
    const qty = item.qty + delta;
    if (qty <= 0) {
      this.remove(item);
      return;
    }
    this.items.update((items) => items.map((i) => (i === item ? { ...i, qty } : i)));
  }

  remove(item: CartItem): void {
    this.items.update((items) => items.filter((i) => i !== item));
  }

  clear(): void {
    this.items.set([]);
  }

  open(): void {
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
  }

  private restore(): CartItem[] {
    const stored = loadFromStorage<StoredItem[]>(STORAGE_KEY, []);
    return stored
      .map((s) => {
        const product = PRODUCTS.find((p) => p.id === s.id);
        return product ? { product, size: s.size, qty: s.qty } : null;
      })
      .filter((i): i is CartItem => i !== null);
  }
}
