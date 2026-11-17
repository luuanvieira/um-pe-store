# Um Pé Sneaker Store

Loja virtual de calçados feita em **Angular 19**: tênis esportivos, casuais e sapatos sociais. Começou como trabalho da disciplina de Desenvolvimento Web (Ciência da Computação, Universidade La Salle) em HTML, CSS e JavaScript puros, e depois foi reconstruída em Angular com carrinho, favoritos e formulários validados.

## Funcionalidades

- **Home** com destaque animado que troca de produto sozinho, faixa rolante, categorias e produtos em destaque
- **Loja** com filtro por categoria (sincronizado com a URL), busca sem acento e ordenação por preço ou nome
- **Modal de produto** com escolha de tamanho, quantidade, avaliação e parcelamento
- **Carrinho lateral** com quantidade, remoção, barra de progresso para frete grátis e total
- **Favoritos** salvos no navegador (localStorage)
- **Cadastro e login** com Reactive Forms: validação, máscara de CPF e telefone e conferência de senha
- Layout **responsivo** com menu mobile

## Tecnologias

- Angular 19 com componentes standalone, **Signals** (`signal`, `computed`, `effect`) e o novo control flow (`@if`, `@for`, `@let`)
- Rotas com lazy loading (`loadComponent`)
- Reactive Forms e validadores customizados
- CSS puro com variáveis, sem framework de UI

## Como rodar

Pré-requisito: [Node.js](https://nodejs.org) 18.19 ou mais recente.

```bash
npm install
npm start
```

O site abre em `http://localhost:4200`.

Para gerar a versão de produção: `npm run build` (sai em `dist/um-pe-store/browser`).

## Estrutura

```
src/app/
├── components/   header, footer, product-card, product-modal, cart-drawer, toast
├── pages/        home, shop, about, favorites, register, login
├── services/     cart, wishlist, toast, ui (estado global com Signals)
├── data/         catálogo de produtos
└── models/       tipos TypeScript
```

---

Desenvolvido por [Luan Vieira](https://github.com/luuanvieira).
