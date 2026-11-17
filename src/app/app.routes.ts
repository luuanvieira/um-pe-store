import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Um Pé Sneaker Store',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'loja',
    title: 'Loja | Um Pé',
    loadComponent: () => import('./pages/shop/shop.component').then((m) => m.ShopComponent),
  },
  {
    path: 'sobre',
    title: 'Sobre | Um Pé',
    loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'favoritos',
    title: 'Favoritos | Um Pé',
    loadComponent: () => import('./pages/favorites/favorites.component').then((m) => m.FavoritesComponent),
  },
  {
    path: 'registrar',
    title: 'Criar conta | Um Pé',
    loadComponent: () => import('./pages/register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'login',
    title: 'Entrar | Um Pé',
    loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  { path: '**', redirectTo: '' },
];
