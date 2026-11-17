import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  template: `
    <div class="toast-stack" aria-live="polite">
      @for (toast of toastService.toasts(); track toast.id) {
        <div class="toast" (click)="toastService.dismiss(toast.id)">
          <i class="uil {{ toast.icon }}"></i>
          <span>{{ toast.message }}</span>
        </div>
      }
    </div>
  `,
  styles: `
    .toast-stack {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      gap: 10px;
      z-index: 200;
      width: max-content;
      max-width: calc(100% - 32px);
    }
    .toast {
      display: flex;
      align-items: center;
      gap: 10px;
      background: var(--ink);
      color: #fff;
      padding: 14px 20px;
      border-radius: 999px;
      box-shadow: var(--shadow-lg);
      font-size: 0.9rem;
      font-weight: 500;
      cursor: pointer;
      animation: toast-in 0.35s cubic-bezier(0.2, 0.9, 0.3, 1.2);
    }
    .toast i {
      color: var(--accent);
      font-size: 1.2rem;
    }
    @keyframes toast-in {
      from { opacity: 0; transform: translateY(20px) scale(0.95); }
      to { opacity: 1; transform: none; }
    }
  `,
})
export class ToastComponent {
  readonly toastService = inject(ToastService);
}
