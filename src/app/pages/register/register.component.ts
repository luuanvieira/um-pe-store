import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { PRODUCTS } from '../../data/products';

function passwordsMatch(group: AbstractControl): ValidationErrors | null {
  const senha = group.get('senha')?.value;
  const confirmar = group.get('confirmar')?.value;
  return senha && confirmar && senha !== confirmar ? { mismatch: true } : null;
}

type Field = 'nome' | 'usuario' | 'email' | 'telefone' | 'cpf' | 'nascimento' | 'senha' | 'confirmar';

const MESSAGES: Record<string, string> = {
  required: 'Campo obrigatório',
  email: 'E-mail inválido',
  minlength: 'Muito curto',
  pattern: 'Formato inválido',
};

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);

  readonly image = PRODUCTS[1].image;
  readonly genders = ['Homem', 'Mulher', 'Prefiro não dizer'];
  showPassword = false;

  readonly form = this.fb.nonNullable.group(
    {
      nome: ['', [Validators.required, Validators.minLength(3)]],
      usuario: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\) \d{4,5}-\d{4}$/)]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      nascimento: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmar: ['', Validators.required],
      genero: [''],
      termos: [false, Validators.requiredTrue],
    },
    { validators: passwordsMatch },
  );

  error(name: Field): string | null {
    const control = this.form.controls[name];
    if (!control.touched || !control.errors) {
      return null;
    }
    const key = Object.keys(control.errors)[0];
    if (key === 'minlength' && name === 'senha') {
      return 'Mínimo de 6 caracteres';
    }
    return MESSAGES[key] ?? 'Valor inválido';
  }

  mismatch(): boolean {
    return this.form.hasError('mismatch') && this.form.controls.confirmar.touched;
  }

  maskCpf(): void {
    const digits = this.form.controls.cpf.value.replace(/\D/g, '').slice(0, 11);
    const masked = digits
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    this.form.controls.cpf.setValue(masked, { emitEvent: false });
  }

  maskPhone(): void {
    const digits = this.form.controls.telefone.value.replace(/\D/g, '').slice(0, 11);
    let masked = digits;
    if (digits.length > 2) {
      masked = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    }
    if (digits.length > 6) {
      const split = digits.length === 11 ? 7 : 6;
      masked = `(${digits.slice(0, 2)}) ${digits.slice(2, split)}-${digits.slice(split)}`;
    }
    this.form.controls.telefone.setValue(masked, { emitEvent: false });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toast.show('Confira os campos destacados', 'uil-exclamation-triangle');
      return;
    }
    const nome = this.form.controls.nome.value.split(' ')[0];
    this.toast.show(`Conta criada! Bem-vindo(a), ${nome}`, 'uil-user-check');
    this.router.navigate(['/login']);
  }
}
