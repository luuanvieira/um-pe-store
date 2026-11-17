import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
  icon: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly toasts = signal<Toast[]>([]);
  private nextId = 1;

  show(message: string, icon = 'uil-check-circle'): void {
    const toast: Toast = { id: this.nextId++, message, icon };
    this.toasts.update((list) => [...list, toast]);
    setTimeout(() => this.dismiss(toast.id), 2800);
  }

  dismiss(id: number): void {
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }
}
