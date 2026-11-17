import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { PRODUCTS } from '../../data/products';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);

  readonly image = PRODUCTS[0].image;
  showPassword = false;

  readonly form = this.fb.nonNullable.group({
    usuario: ['', Validators.required],
    senha: ['', [Validators.required, Validators.minLength(6)]],
    lembrar: [true],
  });

  invalid(name: 'usuario' | 'senha'): boolean {
    const control = this.form.controls[name];
    return control.touched && control.invalid;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.toast.show(`Bem-vindo(a) de volta, ${this.form.controls.usuario.value}!`, 'uil-user-check');
    this.router.navigate(['/']);
  }
}
