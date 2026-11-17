import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PRODUCTS } from '../../data/products';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  readonly heroImage = PRODUCTS[3].image;

  readonly values = [
    { icon: 'uil-heart-rate', title: 'Para todos os esportes', text: 'Modelos ideais para corrida, academia, vôlei, basquete e outras modalidades.' },
    { icon: 'uil-smile', title: 'Conforto no dia a dia', text: 'Tênis casuais que combinam conforto e estilo em diferentes cores e designs.' },
    { icon: 'uil-award', title: 'Ocasiões especiais', text: 'Sapatos sociais sofisticados para quem busca elegância nos momentos importantes.' },
  ];

  readonly timeline = [
    { step: '01', title: 'A ideia', text: 'Surgimos com o propósito de suprir todos os tipos de esporte com conforto e qualidade, levando esse conforto também para o dia a dia dos clientes.' },
    { step: '02', title: 'O projeto', text: 'Somos estudantes de Ciência da Computação na Universidade La Salle. A loja nasceu como projeto da disciplina de Desenvolvimento Web.' },
    { step: '03', title: 'A evolução', text: 'O site foi reconstruído em Angular, com carrinho, favoritos, filtros e formulários validados, para oferecer uma experiência de compra fácil e confiável.' },
  ];
}
